<script lang="ts">
  type UnitLength = 'px' | 'em' | 'rem' | '%';

  import { icons } from '$lib/Services/IconService';
  import type { IconTypes } from '$lib/Types/IconTypes';

  let {
    classes = 'pull-0 push-0 stack-0 drop-0',
    fill = 'surface-dark',
    height = [40, 'px'],
    stroke = 'surface-dark',
    type,
    width = [40, 'px'],
  }: {
    classes?: string | undefined;
    fill?: string;
    height?: [number, UnitLength];
    stroke?: string;
    type: IconTypes;
    width?: [number, UnitLength];
  } = $props();

  let style: string = $state('');

  $effect(() => {
    style = [
      `--fill: ${fill}`,
      `--height: ${height.join('')}`,
      `--stroke: ${stroke}`,
      `--width: ${width.join('')}`,
      'fill: var(--fill)',
      'height: var(--height)',
      'stroke: var(--stroke)',
      'width: var(--width)',
    ].join('; ');
  });
</script>

<figure class={classes} {style} data-role="icon-container">
  {@html icons[type]}
</figure>
