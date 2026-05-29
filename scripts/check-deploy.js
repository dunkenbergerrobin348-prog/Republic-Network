const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "service-worker.js",
  "server.js",
  "icon.svg",
  "netlify.toml",
  "vercel.json",
  "_headers"
];

const missing = requiredFiles.filter((file) => !fs.existsSync(path.join(root, file)));
if (missing.length) {
  throw new Error(`Fehlende Deployment-Dateien: ${missing.join(", ")}`);
}

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const worker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");
const manifest = fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8");

for (const needle of ["styles.css?v=13", "app.js?v=13", "manifest.webmanifest?v=13"]) {
  if (!html.includes(needle)) throw new Error(`index.html referenziert ${needle} nicht.`);
}

if (!worker.includes("galactic-forum-v13")) {
  throw new Error("Service Worker Cache-Version ist nicht v13.");
}

JSON.parse(manifest);
console.log("Deployment-Check erfolgreich.");
