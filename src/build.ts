import { readFileSync, writeFileSync } from 'node:fs'

import { APP_NAME, APP_VERSION } from './version';

const build = await Bun.build({
<<<<<<< HEAD
  entrypoints: ['./src/bot.ts'],
  // sourcemap: 'inline',
  target: 'browser',
})
for (const log of build.logs) console.log(log)
let content = await build.outputs[0]!.text()
content = content.replace('export {', '{')
content = readFileSync('./script.txt').toString() + content
writeFileSync('dist.user.js', content)
=======
	entrypoints: ['./src/bot.ts'],
	// sourcemap: 'inline',
	target: 'browser',
});
for (const log of build.logs) console.log(log);
let content = await build.outputs[0]!.text();
content = content.replace('export {', '{');
const metadata = readFileSync('./script.txt')
	.toString()
	.replaceAll('__APP_NAME__', APP_NAME)
	.replaceAll('__APP_VERSION__', APP_VERSION);
content = metadata + content;
writeFileSync('dist.user.js', content);
>>>>>>> d6e8f17a211b2cef7128ade79a63e7e33d3fc87b
