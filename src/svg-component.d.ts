declare module '*.svg?component-solid' {
  import type { Component } from 'solid-js';
  import type { ComponentProps } from '@solidjs/web';

  const Icon: Component<ComponentProps<'svg'>>;
  export default Icon;
}
