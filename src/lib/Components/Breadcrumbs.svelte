<script lang="ts">
  import Link from '$lib/Components/Link.svelte';
  import type { ResolvedPathname } from '$app/types';

  type Links = {
    url: ResolvedPathname;
    label: string;
  }[];

  let { links, current }: { links?: Links; current: string } = $props();
</script>

<section
  class="align-items-center flex-row flex-wrap-no-wrap full-width gap-8 overflow-x-auto overflow-y-hidden squish-8"
>
  {#each links as link (link.url)}
    <Link classes="text-color-cyan text-bold text-small" href={link.url}>{link.label}</Link>
    <strong>&raquo;</strong>
  {/each}
  <span class="text-small white-space-nowrap">{current}</span>
</section>
