import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'

const root = resolve('out')
const basePath = (process.env.DOCS_BASE_PATH || '').replace(/\/$/, '')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.wasm': 'application/wasm', '.png': 'image/png', '.ico': 'image/x-icon', '.woff2': 'font/woff2' }
const server = http.createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
    if (basePath && pathname !== basePath && !pathname.startsWith(basePath + '/')) {
      res.writeHead(404).end('Not found'); return
    }
    pathname = pathname.slice(basePath.length)
    let file = resolve(root, '.' + (pathname || '/'))
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html')
    const body = await readFile(file)
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' })
    res.end(body)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(await readFile(resolve(root, '404.html')).catch(() => 'Not found'))
  }
})
server.listen(Number(process.env.PORT || 3000), '127.0.0.1', () => {
  console.log(`Local: http://localhost:${server.address().port}${basePath}/`)
})
