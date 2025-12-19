<script lang="ts">
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  import NavigationOverlayStore from '$lib/Stores/NavigationOverlayStore';
  // components
  import Icon from '$lib/Components/Icon.svelte';
  // types
  import type { IconTypes } from '$lib/Types/IconTypes';
  import type { ResolvedPathname } from '$app/types';

  let {
    links = [],
  }: { links: { label: string; href?: ResolvedPathname; icon: IconTypes; action?: () => void }[] } =
    $props();
</script>

<footer
  class:border-right-width-1={$viewWidth > 650 && $viewWidth < 1000}
  class:border-top-width-1={$viewWidth <= 650}
  class:display-none={$viewWidth > 1000}
  class:position-fixed={$viewWidth <= 650}
  class="align-items-center border-color-gray border-style-solid border-width-0 full-height full-width gap-0 grid surface-char"
  id="home-page-footer"
  style="grid-area: home-page-footer; z-index: +1001;"
>
  <figure
    class:display-none={$viewWidth <= 650}
    class="drop-0 pull-0 push-0 stack-0"
    id="home-page-footer-logo"
    style="grid-area: home-page-footer-logo"
  >
    <button
      class="align-items-center border-style-none cursor-pointer flex-row full-height full-width justify-content-center surface-transparent"
      onclick={NavigationOverlayStore.openDrawer}
    >
      <Icon type="menu" fill="var(--color-cyan)" height={[2, 'rem']} width={[2, 'rem']} />
    </button>
  </figure>
  <div
    class:align-content-center={$viewWidth < 1000 && $viewWidth > 650}
    class:align-content-stretch={$viewWidth <= 650}
    class="full-height full-width grid justify-content-center text-color-turquoise"
    id="home-page-footer-links"
    style="grid-area: home-page-footer-links"
  >
    {#each links as link (link.label)}
      {#if link.href}
        <!-- eslint-disable svelte/no-navigation-without-resolve -->
        <a class="align-items-center flex-row justify-content-center squeeze-16" href={link.href}>
          <Icon fill="var(--color-cyan)" height={[2, 'rem']} type={link.icon} width={[2, 'rem']} />
        </a>
      {:else if link.action}
        <button
          class="align-items-center border-width-0 flex-row justify-content-center squeeze-16 surface-transparent"
          onclick={link.action}
        >
          <Icon
            fill="var(--color-cyan)"
            height={[2, 'rem']}
            stroke="var(--color-cyan)"
            type={link.icon}
            width={[2, 'rem']}
          />
        </button>
      {/if}
    {/each}
    <button
      class="align-items-center border-width-0 cursor-pointer flex-row full-height full-width justify-content-center show-650 squeeze-16 surface-transparent text-color-cyan"
      onclick={NavigationOverlayStore.toggleDrawer}
    >
      <Icon fill="var(--color-cyan)" height={[2, 'rem']} type="menu" width={[2, 'rem']} />
    </button>
  </div>
</footer>

<style>
  @media (min-width: 1000px) {
    footer#home-page-footer > #home-page-footer-links {
      grid-auto-rows: 4rem;
    }
  }

  @media (max-width: 999px) {
    footer#home-page-footer {
      grid-template-areas: 'home-page-footer-logo' 'home-page-footer-links';
      grid-template-rows: 4rem 1fr;
    }

    footer#home-page-footer > #home-page-footer-links {
      grid-auto-rows: 4rem;
    }
  }

  @media (max-width: 650px) {
    footer#home-page-footer {
      bottom: 0;
      grid-template-areas: 'home-page-footer-links';
      grid-template-rows: 1fr;
      height: 4rem;
      left: 0;
    }

    footer#home-page-footer > #home-page-footer-links {
      align-items: stretch;
      grid-auto-flow: column;
      justify-content: space-evenly;
    }
  }
</style>
