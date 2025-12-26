<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ResolvedPathname } from '$app/types';

  let { href, classes, children }: { href: ResolvedPathname; classes?: string; children: Snippet } =
    $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve -->
<a {href} class={classes}>
  {@render children()}
</a>
