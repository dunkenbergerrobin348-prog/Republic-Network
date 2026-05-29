const http = require("http");
const fs = require("fs");
const path = require("path");
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
`);

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

  if (pathname === "/api/state" && request.method === "GET") {
    sendJson(response, 200, { ok: true, state: getState() });
    return true;
  }

  if (pathname === "/api/state" && request.method === "PUT") {
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
