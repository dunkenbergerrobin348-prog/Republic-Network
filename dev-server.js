const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml"
};

http
  .createServer((request, response) => {
    const url = new URL(request.url, `http://localhost:${port}`);
    const filePath = path.join(root, url.pathname === "/" ? "index.html" : url.pathname);

    if (!filePath.startsWith(root)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "cache-control": "no-store, no-cache, must-revalidate",
        "content-type": types[path.extname(filePath)] || "application/octet-stream"
      });
      response.end(data);
    });
  })
  .listen(port, () => {
    console.log(`Galactic Forum laeuft auf http://localhost:${port}`);
  });
