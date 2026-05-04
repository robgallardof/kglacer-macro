import { readFileSync, writeFileSync } from 'node:fs'

import { APP_VERSION } from './version'

const build = await Bun.build({
  entrypoints: ['./src/bot.ts'],
  target: 'browser',
  minify: true,
})
for (const log of build.logs) console.log(log)
let content = await build.outputs[0]!.text()
content = content
  // Bun may emit ESM exports. Userscripts run as classic scripts, so any export
  // statement must be removed from the final artifact.
  .replace(/(?:^|\n)export\s*\{[^}]*\};?\s*$/gm, '')
  .replace(/(?:^|\n)export\s+default\s+[^;]+;?\s*$/gm, '')
  .replace(/(?:^|\n)export\s+(?:const|let|var|function|class)\s+/gm, '\n')
  .replace(/export\{[^}]*\};?/g, '')
const scriptHeader = readFileSync('./script.txt')
  .toString()
  .replaceAll('__APP_VERSION__', APP_VERSION)
content = scriptHeader + content
writeFileSync('dist.user.js', content)
