import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(entries.map(e => e.isDirectory() ? walk(join(dir, e.name)) : join(dir, e.name)))).flat()
}
const pages = (await walk('app')).filter(p => p.endsWith('page.mdx'))
const routes = new Set(pages.map(p => '/' + relative('app', p).split(sep).slice(0, -1).join('/')))
let links = 0
for (const page of pages) {
  const source = await readFile(page, 'utf8')
  assert.match(source, /^# .+/m, `${page}: missing title`)
  for (const match of source.matchAll(/(?:\]\(|href=")((?:\/(?!\/))[^)"\s]+)[)"]/g)) {
    const route = match[1].split('#')[0].replace(/\/$/, '') || '/'
    assert(routes.has(route), `${page}: broken link ${route}`)
    links++
  }
  let cells = null
  for (const line of source.split('\n')) {
    if (!line.startsWith('|')) { cells = null; continue }
    const n = line.split('|').length
    if (cells === null) cells = n
    assert.equal(n, cells, `${page}: uneven table row ${line.slice(0, 80)}`)
  }
}
const manifest = JSON.parse(await readFile('data/source-manifest.json', 'utf8'))
assert.equal(manifest.sources.length, 9)
assert.equal(new Set(manifest.sources.map(s => s.id)).size, 9)
assert(manifest.sources.every(s => /^[a-f0-9]{64}$/.test(s.sha256)))
console.log(`Checked ${pages.length} documentation pages, ${links} internal links, all table rows and ${manifest.sources.length} source records.`)
