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
  // Some Bun bundles end with "export{...};" (no spaces/newline). Strip any terminal ESM export
  // so the userscript can run as a classic script in Tampermonkey/Violentmonkey.
  .replace(/(?:^|\n)export\s*\{[^}]*\};?\s*$/m, '')
  .replace(/(?:^|\n)export\{[^}]*\};?\s*$/m, '')
  .replace(/export\{[^}]+\};/g, '')
const scriptHeader = readFileSync('./script.txt')
  .toString()
  .replaceAll('__APP_VERSION__', APP_VERSION)
content = scriptHeader + content
writeFileSync('dist.user.js', content)
