# phosphor-solid

Phosphor icons exported as SolidJS 2 components. Install the package:

```sh
npm install github:repr-man/phosphor-solid
```

Import icons by name from the package root:

```tsx
import { AcornBold, AirplaneLandingRegular } from 'phosphor-solid';

export function Example() {
  return (
    <div>
      <AcornBold width={24} height={24} aria-label="Acorn" />
      <AirplaneLandingRegular class="icon" />
    </div>
  );
}
```

Each icon is an inline SVG Solid component. Components accept standard SVG
attributes and event props, including `width`, `height`, `class`, `style`,
`color`, and accessibility attributes such as `aria-label`. Props are applied
to the root `<svg>`; the paths, `viewBox`, and any icon-specific attributes come
from the source artwork. Artwork using `currentColor` follows the CSS `color`
value. Icons with multiple variants are exported with one of six weight
suffixes: `Thin`, `Light`, `Regular`, `Bold`, `Fill`, and `Duotone` (for example,
`AcornThin` or `AcornDuotone`).

The package exposes named exports from its root as ESM, with TypeScript
declarations. It marks itself side-effect-free and publishes per-module output,
so bundlers can tree-shake icons that are not imported. Its runtime dependencies
are `solid-js` and `@solidjs/web`.

## Development

Run `pnpm build` to regenerate `src/index.ts` from the SVG files in `raw/`, build
the ESM library into `dist/`, emit TypeScript declarations, and copy the SVG
component type declaration. The library build uses
[`vite-plugin-solid-2-svg`](https://github.com/repr-man/vite-plugin-solid-2-svg)
with Vite to turn each `?component-solid` SVG import into a typed Solid
component; it is a build-time plugin and is not needed in consuming applications.
