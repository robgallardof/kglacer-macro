import { readFileSync, writeFileSync } from 'node:fs';

import { APP_NAME, APP_VERSION } from './version';

const build = await Bun.build({
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
