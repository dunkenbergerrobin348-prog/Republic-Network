const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { DatabaseSync } = require("node:sqlite");

const root = __dirname;
const dataDir = path.join(root, "data");
const dbPath = path.join(dataDir, "galactic-forum.sqlite");
const port = Number(process.env.PORT || 4173);
const maxBodyBytes = 2_000_000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".md": "text/markdown; charset=utf-8"
};

fs.mkdirSync(dataDir, { recursive: true });

const db = new DatabaseSync(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS app_state (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    data TEXT NOT NULL,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_salt TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'member',
    discord_username TEXT NOT NULL DEFAULT '',
    rp_name TEXT NOT NULL DEFAULT '',
    ct_number TEXT NOT NULL DEFAULT '',
    rp_name_2 TEXT NOT NULL DEFAULT '',
    rp_name_3 TEXT NOT NULL DEFAULT '',
    account_status TEXT NOT NULL DEFAULT 'pending',
    unit_access TEXT NOT NULL DEFAULT '[]',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS sessions (
    token TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS audit_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    actor_id INTEGER,
    actor_name TEXT NOT NULL DEFAULT '',
    action TEXT NOT NULL,
    target TEXT NOT NULL DEFAULT '',
    details TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

for (const migration of [
  "ALTER TABLE users ADD COLUMN discord_username TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE users ADD COLUMN rp_name TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE users ADD COLUMN ct_number TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE users ADD COLUMN rp_name_2 TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE users ADD COLUMN rp_name_3 TEXT NOT NULL DEFAULT ''",
  "ALTER TABLE users ADD COLUMN account_status TEXT NOT NULL DEFAULT 'pending'",
  "ALTER TABLE users ADD COLUMN unit_access TEXT NOT NULL DEFAULT '[]'"
]) {
  try {
    db.exec(migration);
  } catch (error) {
    if (!String(error.message).includes("duplicate column")) throw error;
  }
}

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "cache-control": "no-store",
    "content-type": "application/json; charset=utf-8"
  });
  response.end(JSON.stringify(payload));
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > maxBodyBytes) {
        reject(new Error("Request body too large"));
        request.destroy();
      }
    });
    request.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    request.on("error", reject);
  });
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(password, salt, 210000, 32, "sha256").toString("hex");
  return { salt, hash };
}

function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt);
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"));
}

function sanitizeUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    discordUsername: user.discord_username || user.username,
    rpName: user.rp_name || user.username,
    ctNumber: user.ct_number || "",
    rpName2: user.rp_name_2 || "",
    rpName3: user.rp_name_3 || "",
    status: user.account_status || "pending",
    unitAccess: JSON.parse(user.unit_access || "[]")
  };
}

function getAuthUser(request) {
  const header = request.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;

  const row = db
    .prepare(
      `
        SELECT users.id, users.username, users.role, users.discord_username, users.rp_name, users.ct_number, users.rp_name_2, users.rp_name_3, users.account_status, users.unit_access
        FROM sessions
        JOIN users ON users.id = sessions.user_id
        WHERE sessions.token = ? AND sessions.expires_at > CURRENT_TIMESTAMP
      `
    )
    .get(token);

  return row || null;
}

function requireAuth(request, response) {
  const user = getAuthUser(request);
  if (!user) {
    sendJson(response, 401, { ok: false, error: "Login erforderlich" });
    return null;
  }
  return user;
}

function requireApproved(request, response) {
  const user = requireAuth(request, response);
  if (!user) return null;
  if (user.role !== "owner" && user.account_status !== "approved") {
    sendJson(response, 403, { ok: false, error: "Account wartet auf Freischaltung" });
    return null;
  }
  return user;
}

function requireOwner(request, response) {
  const user = requireAuth(request, response);
  if (!user) return null;
  if (user.role !== "owner") {
    sendJson(response, 403, { ok: false, error: "Owner-Rechte erforderlich" });
    return null;
  }
  return user;
}

function createSession(userId) {
  const token = crypto.randomBytes(32).toString("hex");
  db.prepare(
    "INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, datetime('now', '+14 days'))"
  ).run(token, userId);
  return token;
}

function hasUsers() {
  return db.prepare("SELECT COUNT(*) AS count FROM users").get().count > 0;
}

function writeAudit(actor, action, target = "", details = {}) {
  db.prepare("INSERT INTO audit_log (actor_id, actor_name, action, target, details) VALUES (?, ?, ?, ?, ?)")
    .run(actor?.id || null, actor?.username || "system", action, target, JSON.stringify(details));
}

function getState() {
  const row = db.prepare("SELECT data, updated_at FROM app_state WHERE id = 1").get();
  if (!row) return null;
  return { ...JSON.parse(row.data), updatedAt: row.updated_at };
}

function saveState(payload) {
  const state = {
    threads: Array.isArray(payload.threads) ? payload.threads : [],
    members: payload.members && typeof payload.members === "object" ? payload.members : {},
    chats: payload.chats && typeof payload.chats === "object" ? payload.chats : {},
    memberTemplates: payload.memberTemplates && typeof payload.memberTemplates === "object" ? payload.memberTemplates : {},
    notifications: Array.isArray(payload.notifications) ? payload.notifications : [],
    wikiPages: payload.wikiPages && typeof payload.wikiPages === "object" ? payload.wikiPages : {},
    applications: Array.isArray(payload.applications) ? payload.applications : [],
    owners: payload.owners && typeof payload.owners === "object" ? payload.owners : {},
    permissions: payload.permissions && typeof payload.permissions === "object" ? payload.permissions : {}
  };

  db.prepare(
    `
      INSERT INTO app_state (id, data, updated_at)
      VALUES (1, ?, CURRENT_TIMESTAMP)
      ON CONFLICT(id) DO UPDATE SET data = excluded.data, updated_at = CURRENT_TIMESTAMP
    `
  ).run(JSON.stringify(state));

  return getState();
}

async function handleApi(request, response, pathname) {
  if (pathname === "/api/health" && request.method === "GET") {
    sendJson(response, 200, { ok: true, database: "sqlite", path: "data/galactic-forum.sqlite" });
    return true;
  }

  if (pathname === "/api/auth/status" && request.method === "GET") {
    sendJson(response, 200, {
      ok: true,
      hasUsers: hasUsers(),
      user: sanitizeUser(getAuthUser(request))
    });
    return true;
  }

  if (pathname === "/api/auth/setup" && request.method === "POST") {
    if (hasUsers()) {
      sendJson(response, 409, { ok: false, error: "Setup wurde bereits abgeschlossen" });
      return true;
    }

    try {
      const payload = await readJsonBody(request);
      const username = String(payload.username || "").trim();
      const password = String(payload.password || "");
      const rpName = String(payload.rpName || username).trim();
      const ctNumber = String(payload.ctNumber || "").trim();
      if (username.length < 3 || password.length < 6) {
        sendJson(response, 400, { ok: false, error: "Benutzername min. 3 Zeichen, Passwort min. 6 Zeichen" });
        return true;
      }

      const { salt, hash } = hashPassword(password);
      const result = db
        .prepare(
          `
            INSERT INTO users (username, password_salt, password_hash, role, discord_username, rp_name, ct_number, rp_name_2, rp_name_3, account_status, unit_access)
            VALUES (?, ?, ?, 'owner', ?, ?, ?, ?, ?, 'approved', ?)
          `
        )
        .run(
          username,
          salt,
          hash,
          String(payload.discordUsername || username).trim(),
          rpName,
          ctNumber,
          String(payload.rpName2 || "").trim(),
          String(payload.rpName3 || "").trim(),
          JSON.stringify(["212th", "501st", "91st", "Fleet Crew", "5th", "Flottensicherheit"])
        );
      const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
      sendJson(response, 200, { ok: true, token: createSession(user.id), user: sanitizeUser(user) });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return true;
  }

  if (pathname === "/api/auth/register" && request.method === "POST") {
    try {
      const payload = await readJsonBody(request);
      const username = String(payload.username || payload.discordUsername || "").trim();
      const discordUsername = String(payload.discordUsername || username).trim();
      const rpName = String(payload.rpName || "").trim();
      const ctNumber = String(payload.ctNumber || "").trim();
      const password = String(payload.password || "");

      if (username.length < 3 || password.length < 6 || rpName.length < 2) {
        sendJson(response, 400, { ok: false, error: "Discord/Benutzername, RP-Name und Passwort sind erforderlich" });
        return true;
      }

      const { salt, hash } = hashPassword(password);
      const result = db
        .prepare(
          `
            INSERT INTO users (username, password_salt, password_hash, role, discord_username, rp_name, ct_number, rp_name_2, rp_name_3, account_status, unit_access)
            VALUES (?, ?, ?, 'user', ?, ?, ?, ?, ?, 'pending', '[]')
          `
        )
        .run(
          username,
          salt,
          hash,
          discordUsername,
          rpName,
          ctNumber,
          String(payload.rpName2 || "").trim(),
          String(payload.rpName3 || "").trim()
        );
      const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
      sendJson(response, 200, { ok: true, token: createSession(user.id), user: sanitizeUser(user) });
    } catch (error) {
      const message = String(error.message).includes("UNIQUE") ? "Dieser Discord-/Benutzername existiert bereits" : error.message;
      sendJson(response, 400, { ok: false, error: message });
    }
    return true;
  }

  if (pathname === "/api/auth/login" && request.method === "POST") {
    try {
      const payload = await readJsonBody(request);
      const username = String(payload.username || "").trim();
      const password = String(payload.password || "");
      const user = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
      if (!user || !verifyPassword(password, user.password_salt, user.password_hash)) {
        sendJson(response, 401, { ok: false, error: "Login abgelehnt" });
        return true;
      }
      sendJson(response, 200, { ok: true, token: createSession(user.id), user: sanitizeUser(user) });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return true;
  }

  if (pathname === "/api/auth/logout" && request.method === "POST") {
    const header = request.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : "";
    if (token) db.prepare("DELETE FROM sessions WHERE token = ?").run(token);
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (pathname === "/api/admin/users" && request.method === "GET") {
    if (!requireOwner(request, response)) return true;
    const users = db
      .prepare("SELECT id, username, role, discord_username, rp_name, ct_number, rp_name_2, rp_name_3, account_status, unit_access, created_at FROM users ORDER BY created_at DESC")
      .all()
      .map(sanitizeUser);
    sendJson(response, 200, { ok: true, users });
    return true;
  }

  if (pathname === "/api/admin/audit" && request.method === "GET") {
    if (!requireOwner(request, response)) return true;
    const rows = db.prepare("SELECT * FROM audit_log ORDER BY created_at DESC LIMIT 120").all();
    sendJson(response, 200, { ok: true, entries: rows.map((row) => ({ ...row, details: JSON.parse(row.details || "{}") })) });
    return true;
  }

  const userMatch = pathname.match(/^\/api\/admin\/users\/(\d+)$/);
  if (userMatch && request.method === "PATCH") {
    const actor = requireOwner(request, response);
    if (!actor) return true;
    try {
      const id = Number(userMatch[1]);
      const payload = await readJsonBody(request);
      const current = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
      if (!current) {
        sendJson(response, 404, { ok: false, error: "Nutzer nicht gefunden" });
        return true;
      }
      const role = ["user", "admin", "owner"].includes(payload.role) ? payload.role : current.role;
      const status = ["pending", "approved", "blocked"].includes(payload.status) ? payload.status : current.account_status;
      const unitAccess = Array.isArray(payload.unitAccess) ? payload.unitAccess : JSON.parse(current.unit_access || "[]");
      db.prepare("UPDATE users SET role = ?, account_status = ?, unit_access = ? WHERE id = ?").run(role, status, JSON.stringify(unitAccess), id);
      writeAudit(actor, "user.updated", current.username, { role, status, unitAccess });
      sendJson(response, 200, { ok: true, user: sanitizeUser(db.prepare("SELECT * FROM users WHERE id = ?").get(id)) });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return true;
  }

  const resetMatch = pathname.match(/^\/api\/admin\/users\/(\d+)\/password$/);
  if (resetMatch && request.method === "POST") {
    const actor = requireOwner(request, response);
    if (!actor) return true;
    try {
      const id = Number(resetMatch[1]);
      const payload = await readJsonBody(request);
      const password = String(payload.password || "");
      if (password.length < 6) {
        sendJson(response, 400, { ok: false, error: "Passwort muss mindestens 6 Zeichen haben" });
        return true;
      }
      const target = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
      if (!target) {
        sendJson(response, 404, { ok: false, error: "Nutzer nicht gefunden" });
        return true;
      }
      const { salt, hash } = hashPassword(password);
      db.prepare("UPDATE users SET password_salt = ?, password_hash = ? WHERE id = ?").run(salt, hash, id);
      db.prepare("DELETE FROM sessions WHERE user_id = ?").run(id);
      writeAudit(actor, "password.reset", target.username, {});
      sendJson(response, 200, { ok: true });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return true;
  }

  if (pathname === "/api/state" && request.method === "GET") {
    if (!requireApproved(request, response)) return true;
    sendJson(response, 200, { ok: true, state: getState() });
    return true;
  }

  if (pathname === "/api/state" && request.method === "PUT") {
    if (!requireApproved(request, response)) return true;
    try {
      const payload = await readJsonBody(request);
      sendJson(response, 200, { ok: true, state: saveState(payload) });
    } catch (error) {
      sendJson(response, 400, { ok: false, error: error.message });
    }
    return true;
  }

  return false;
}

function sendStatic(request, response, pathname) {
  const normalizedPath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const filePath = path.normalize(path.join(root, normalizedPath));

  if (!filePath.startsWith(root) || filePath.startsWith(dataDir)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    const cacheControl = path.basename(filePath) === "service-worker.js" ? "no-store, no-cache, must-revalidate" : "no-cache";
    response.writeHead(200, {
      "cache-control": cacheControl,
      "content-type": types[path.extname(filePath)] || "application/octet-stream",
      "x-content-type-options": "nosniff"
    });
    response.end(data);
  });
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://localhost:${port}`);

  if (await handleApi(request, response, url.pathname)) return;
  sendStatic(request, response, url.pathname);
});

server.listen(port, () => {
  console.log(`Galactic Forum Backend laeuft auf http://localhost:${port}`);
  console.log(`SQLite Datenbank: ${dbPath}`);
});
