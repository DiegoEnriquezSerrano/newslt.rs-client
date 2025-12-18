<script lang="ts">
  import Icon from '$lib/Components/Icon.svelte';
  import { viewWidth } from '$lib/Stores/LayoutStore';
  import type { Snippet } from 'svelte';

  let { children }: { children: Snippet } = $props();
</script>

<main
  class="display-grid full-width full-height overflow-hidden"
  id="app"
  style="grid-template-rows: 4rem 1fr; grid-template-columns: 1fr; grid-template-areas: 'header' 'content';"
>
  <header
    class="flex-row full-width justify-content-space-between align-items-center position-sticky border-width-0 border-bottom-width-2 border-color-gray border-style-solid raised-1"
    style="grid-area: header;"
  >
    <p class="squeeze-8 squish-8 text-color-cyan font-weight-bold text-x-large cursor-default">
      Newsletters
    </p>
    <a href="/login">
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
