<script lang="ts">
  // dependencies
  import { resolve } from '$app/paths';
  // components
  import Icon from '$lib/Components/Icon.svelte';
  import IconButton from '$lib/Components/IconButton.svelte';
  // services
  import AuthenticationService from '$lib/Services/AuthenticationService';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  import NavigationOverlayStore from '$lib/Stores/NavigationOverlayStore';
  // types
  import type { ResolvedPathname } from '$app/types';
  import type { IconTypes } from '$lib/Types/IconTypes';

  type Links = {
    href?: ResolvedPathname;
    icon: IconTypes;
    label: string;
  }[];

  let { links, isAuthenticated = false }: { links: Links; isAuthenticated?: boolean } = $props();

  const direction = 'ltr';
</script>

<div
  class="border-width-0 border-right-width-1 border-color-gray border-style-outset height-view-100 overflow-x-hidden overflow-y-auto position-fixed raised-2 surface-char text-color-cyan width-view-90"
  class:open={$NavigationOverlayStore.open}
  id="navigation-overlay"
  style="--max-width: 17.5rem; grid-area: navigation-overlay; max-width: var(--max-width); transition: left 0.2s cubic-bezier(0.25, 0.1, 0.25, 1); z-index: +1001;"
>
  <div class="align-items-start flash flex-column flex-item full-height justify-content-start">
    <div class="flex-row full-width justify-content-end">
      <button
        id="navigation-overlay-close-button"
        class="border-width-0 cursor-pointer cursor-pointer flex-row squeeze-16 squish-16 surface-char text-color-light"
        class:visibility-hidden={$viewWidth >= 1000}
        onclick={NavigationOverlayStore.closeDrawer}
      >
        <Icon
          classes="align-items-center flex-row justify-content-center pull-0 push-0"
          fill="var(--color-cyan)"
          height={[1.5, 'rem']}
          stroke="var(--color-cyan)"
          type="x"
          width={[1.5, 'rem']}
        />
      </button>
    </div>
    {#each links as link (link.label)}
      <IconButton
        {direction}
        fill="var(--color-cyan)"
        href={link.href}
        onclick={NavigationOverlayStore.closeDrawer}
        text={link.label}
        type={link.icon}
      />
    {/each}
    {#if isAuthenticated}
      <IconButton
        {direction}
        fill="var(--color-cyan)"
        onclick={AuthenticationService.onLogout}
        stroke="var(--color-cyan)"
        text="Logout"
        type="logout"
      />
    {:else}
      <IconButton
        {direction}
        fill="var(--color-cyan)"
        href={resolve('/login')}
        stroke="var(--color-cyan)"
        text="Login"
        type="login"
      />
    {/if}
    <hr class="stack-32" />
    <div
      class="border-color-gray border-style-outset border-top-width-1 border-width-0 full-height full-width"
      style="box-shadow: 0 0 .5rem var(--color-black);"
    ></div>
  </div>
</div>

<style>
  @media (min-width: 1000px) {
    #navigation-overlay {
      left: 0;
    }
  }

  @media (max-width: 999px) {
    #navigation-overlay {
      left: calc(-10px - 100vw);
    }

    #navigation-overlay.open {
      left: 0;
    }
  }
</style>
