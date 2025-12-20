<script lang="ts">
  import type { ResolvedPathname } from '$app/types';
  import type { Snippet } from 'svelte';

  type Links = {
    href: ResolvedPathname;
    label: string;
  }[];

  let { links, children }: { links?: Links; children?: Snippet } = $props();
</script>

<header
  class="align-items-center center-horizontal flex-row flex-wrap-wrap full-width gap-8 justify-content-space-between"
  style="max-width: 52rem;"
>
  <section class="align-items-center flex-item flex-row gap-8 justify-content-start">
    {#each links as link, i (link.href)}
      {#if i !== 0}
        <span>|</span>
      {/if}
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      <a href={link.href} class="text-color-cyan">
        <strong>{link.label}</strong>
      </a>
    {/each}
  </section>
  {#if children}
    <section class="align-items-center flex-row gap-8">
      {@render children()}
    </section>
  {/if}
</header>
