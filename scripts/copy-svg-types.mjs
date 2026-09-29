import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const declaration = fileURLToPath(new URL('../dist/svg-component.d.ts', import.meta.url));
const rootTypes = fileURLToPath(new URL('../dist/index.d.ts', import.meta.url));

await copyFile(fileURLToPath(new URL('../src/svg-component.d.ts', import.meta.url)), declaration);
await writeFile(rootTypes, `/// <reference path="./svg-component.d.ts" />\n${await readFile(rootTypes, 'utf8')}`);
