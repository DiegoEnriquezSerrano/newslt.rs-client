<script lang="ts">
  // dependencies
  import { resolve } from '$app/paths';
  // components
  import Icon from '$lib/Components/Icon.svelte';
  // helpers
  import { classList } from '$lib/utils';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  // types
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<main class="display-grid full-width full-height max-height-view-100 overflow-hidden" id="app">
  <header
    class={classList([
      'align-items-center',
      'border-color-gray',
      'border-style-solid',
      'border-width-0',
      'border-bottom-width-1',
      'flex-row',
      'full-width',
      'justify-content-space-between',
      'position-sticky',
    ])}
    style="grid-area: header;"
  >
    <p class="squeeze-8 squish-8 text-color-cyan font-weight-bold text-x-large cursor-default">
      newslt.rs
    </p>
    <a href={resolve('/login')}>
      <figure class="squish-8 squeeze-8">
        <Icon type="user" fill="var(--color-cyan)" height={[2, 'rem']} width={[2, 'rem']} />
      </figure>
    </a>
  </header>
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
      {@render children()}
    </section>
  </section>
</main>

<style>
  @media (min-width: 1000px) {
    main#app {
      grid-template-areas: 'header' 'content';
      grid-template-columns: 1fr;
      grid-template-rows: 3rem 1fr;
    }
  }

  @media (max-width: 999px) {
    main#app {
      grid-template-areas: 'header' 'content';
      grid-template-columns: 1fr;
      grid-template-rows: 4rem 1fr;
    }
  }
</style>
