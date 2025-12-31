<script lang="ts">
  // components
  import Breadcrumbs from '$lib/Components/Breadcrumbs.svelte';
  import Footer from '$lib/Components/Layouts/ResponsivePageFooter.svelte';
  import Header from '$lib/Components/Layouts/ResponsivePageHeader.svelte';
  import NavigationOverlay from '$lib/Components/NavigationOverlay.svelte';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  // types
  import type { Snippet } from 'svelte';
  import type { ResponsivePageWrapperSettings } from '$lib/Types/Components/ResponsivePageWrapperTypes';

  let {
    breadcrumbs,
    children,
    footer,
    header,
    navigationOverlay,
  }: ResponsivePageWrapperSettings & {
    children: Snippet;
  } = $props();
</script>

<main class="display-grid full-height full-width max-height-view-100 overflow-hidden" id="app">
  <Header {...header} />
  <section
    class:squeeze-16={$viewWidth > 650}
    class:squeeze-8={$viewWidth < 650}
    class:squish-16={$viewWidth > 650}
    class:squish-8={$viewWidth < 650}
    class="overflow-y-auto overflow-x-hidden"
    id="content"
    style="grid-area: content;"
  >
    <section class="center-horizontal">
      {#if breadcrumbs}
        <section>
          <Breadcrumbs {...breadcrumbs} />
        </section>
      {/if}
      {@render children()}
    </section>
  </section>
  <Footer {...footer} />
  <NavigationOverlay {...navigationOverlay} />
</main>

<style>
  @media (min-width: 1000px) {
    main#app {
      grid-template-areas: 'navigation-overlay home-page-header' 'navigation-overlay content';
      grid-template-columns: 17.5rem 1fr;
      grid-template-rows: 3rem 1fr;
    }
  }

  @media (max-width: 999px) {
    main#app {
      grid-template-areas: 'home-page-footer home-page-header' 'home-page-footer content';
      grid-template-columns: 4rem 1fr;
      grid-template-rows: 4rem 1fr;
    }
  }

  @media (max-width: 650px) {
    main#app {
      grid-template-areas: 'home-page-header' 'content' 'home-page-footer';
      grid-template-columns: none;
      grid-template-rows: 4rem 1fr 4rem;
    }
  }
</style>
