<script lang="ts">
  import type { Snippet } from 'svelte';

  let {
    children,
    disabled = undefined,
    id = undefined,
    name = undefined,
    type = undefined,
  }: {
    children: Snippet;
    disabled?: boolean;
    id?: string;
    name?: string;
    type?: 'submit' | 'button' | 'reset';
  } = $props();
</script>

<button
  class:dim-50={disabled}
  class="squeeze-16 squish-8 border-rounded-8 border-style-outset text-color-white surface-char border-width-2 border-color-gray text-color-light raised-1 font-weight-bold cursor-pointer"
  data-testid={id}
  {disabled}
  {id}
  {name}
  {type}
>
  {@render children()}
</button>
