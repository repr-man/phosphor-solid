import { readdir, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const rawRoot = join(root, 'raw');
const sourceRoot = join(root, 'src');
const weights = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone'];

function pascalCase(value) {
  return value
    .split('-')
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join('');
}

const icons = [];

for (const weight of weights) {
  const weightDir = join(rawRoot, weight);
  const files = (await readdir(weightDir)).filter((file) => file.endsWith('.svg')).sort();

  for (const file of files) {
    const stem = file.slice(0, -'.svg'.length);
    const suffix = `-${weight}`;
    if (weight !== 'regular' && !stem.endsWith(suffix)) {
      throw new Error(`Expected ${file} in raw/${weight} to end with ${suffix}`);
    }

    const iconName = weight === 'regular' ? stem : stem.slice(0, -suffix.length);
    const name = `${pascalCase(iconName)}${pascalCase(weight)}`;
    const svgPath = relative(sourceRoot, join(weightDir, file)).replaceAll('\\', '/');
    icons.push({ name, svgPath });
  }
}

if (new Set(icons.map(({ name }) => name)).size !== icons.length) {
  throw new Error('Two SVG files produce the same component name');
}

icons.sort((a, b) => a.name.localeCompare(b.name));

const exports = icons.map(
  ({ name, svgPath }) => `export { default as ${name} } from '${svgPath}?component-solid';`,
);
await writeFile(join(sourceRoot, 'index.ts'), `${exports.join('\n')}\n`);
console.log(`Generated ${icons.length} direct SVG exports in src/index.ts.`);
