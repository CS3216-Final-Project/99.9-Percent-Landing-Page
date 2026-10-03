import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve, extname, sep } from "node:path";

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const root = resolve(fileURLToPath(new URL(".", import.meta.url)), option("--dir", "."));
const port = Number(option("--port", process.env.PORT || "4173"));
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml" };

if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("Invalid port");
const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" });
    response.end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const file = resolve(root, relativePath);
    const type = types[extname(file)];
    if (!file.startsWith(root + sep) || relativePath.split(/[\\/]/).some((part) => part.startsWith(".")) || !type) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }
    const content = await readFile(file);
    response.writeHead(200, { "Content-Type": type, "Content-Length": content.length, "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 400);
    response.end("Not found");
  }
});
server.listen(port, "127.0.0.1", () => console.log(`Preview: http://127.0.0.1:${port}`));
