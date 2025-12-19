<script lang="ts">
  import type { ResolvedPathname } from '$app/types';

  type Links = {
    href: ResolvedPathname;
    label: string;
  }[];

  let { links }: { links?: Links } = $props();
</script>

<header
  class="align-items-center center-horizontal flex-row full-width gap-8 justify-content-start"
  style="max-width: 52rem;"
>
  {#each links as link (link.href)}
    <a href={link.href} class="text-color-cyan">
      <strong>{link.label}</strong>
    </a>
  {/each}
</header>
