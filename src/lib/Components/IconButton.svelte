<script lang="ts">
  import { icons } from '$lib/Services/IconService';
  import type { IconTypes } from '$lib/Types/IconTypes';

  type Direction = 'ltr' | 'rtl';

  let {
    direction = 'rtl',
    fill = 'var(--color-light)',
    height = 40,
    href = undefined,
    stroke = 'var(--color-light)',
    text = '',
    type,
    width = 40,
    onclick,
  }: {
    direction?: Direction;
    fill?: string;
    height?: number;
    href?: string | undefined;
    stroke?: string;
    text: string;
    type: IconTypes;
    width?: number;
    onclick?: (e: MouseEvent) => void;
  } = $props();

  const rules =
    'fill: var(--fill); height: var(--height); stroke: var(--stroke); width: var(--width);';
  const variables = `--height: ${height}px; --width: ${width}px; --fill: ${fill}; --stroke: ${stroke};`;

  let style: string = [variables, rules].join(' ');
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a
  {href}
  class={[
    'align-items-center',
    'border-width-0',
    'cursor-pointer',
    'full-width',
    'gap-8',
    'justify-content-space-between',
    'squeeze-24',
    'squish-16',
    'text-color-cyan',
  ].join(' ')}
  class:flex-row={direction === 'rtl'}
  class:flex-row-reverse={direction === 'ltr'}
  {onclick}
>
  <div class="squeeze-8 squish-8 surface-char" data-icon={type} {style}>
    <!-- eslint-disable svelte/no-at-html-tags -->
    {@html icons[type]}
  </div>
  {#if !!text.trim()}
    <span class="flex-item flex-row justify-content-center text-shadow-1">
      {text}
    </span>
  {/if}
</a>
