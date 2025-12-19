<script lang="ts">
  // components
  import Footer from '$lib/Components/Layouts/ResponsivePageFooter.svelte';
  import Header from '$lib/Components/Layouts/ResponsivePageHeader.svelte';
  import NavigationOverlay from '$lib/Components/NavigationOverlay.svelte';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  // types
  import type { ComponentProps, Snippet } from 'svelte';

  let {
    children,
    footer,
    header,
    navigationOverlay,
  }: {
    children: Snippet;
    footer: ComponentProps<typeof Footer>;
    header: ComponentProps<typeof Header>;
    navigationOverlay: ComponentProps<typeof NavigationOverlay>;
  } = $props();
</script>

<main class="display-grid full-height full-width overflow-hidden" id="app">
  <Header {...header} />
  <section
    class:squeeze-16={$viewWidth > 650}
    class:squeeze-8={$viewWidth < 650}
    class:squish-16={$viewWidth > 650}
    class:squish-8={$viewWidth < 650}
    class="overflow-x-hidden overflow-y-auto"
    id="content"
    style="grid-area: home-page-content"
  >
    <section class="center-horizontal">
      {@render children()}
    </section>
  </section>
  <Footer {...footer} />
  <NavigationOverlay {...navigationOverlay} />
</main>

<style>
  @media (min-width: 1000px) {
    main#app {
      grid-template-areas: 'navigation-overlay home-page-header' 'navigation-overlay home-page-content';
      grid-template-columns: 17.5rem 1fr;
      grid-template-rows: 3rem 1fr;
    }
  }

  @media (max-width: 999px) {
    main#app {
      grid-template-areas: 'home-page-footer home-page-header' 'home-page-footer home-page-content';
      grid-template-columns: 4rem 1fr;
      grid-template-rows: 4rem 1fr;
    }
  }

  @media (max-width: 650px) {
    main#app {
      grid-template-areas: 'home-page-header' 'home-page-content' 'home-page-footer';
      grid-template-columns: none;
      grid-template-rows: 4rem 1fr 4rem;
    }
  }
</style>
