<script lang="ts">
  // dependencies
  import { resolve } from '$app/paths';
  // components
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<ResponsivePageWrapper
  breadcrumbs={{
    links: [{ url: resolve('/home'), label: 'Home' }],
    current: 'Newsletters',
  }}
  header={{ title: 'Newsletters' }}
  footer={{
    links: [
      { label: 'Home', href: resolve('/home'), icon: 'home' },
      { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
    ],
  }}
  navigationOverlay={{
    links: [
      { label: 'Home', href: resolve('/home'), icon: 'home' },
      { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
    ],
  }}
>
  <section class="full-width squish-8">
    {#each data.newsletters as newsletter (newsletter.newsletter_issue_id)}
      <section class="stack-24">
        <article
          class="border-color-gray border-rounded-16 border-style-outset border-width-2 center-horizontal raised-1"
          class:squeeze-8={$viewWidth < 650}
          class:squeeze-16={$viewWidth > 650}
          class:squish-8={$viewWidth < 650}
          class:squish-16={$viewWidth > 650}
          style="max-width: 40rem;"
        >
          <h2
            class="center-horizontal full-width line-height-extra-large overflow-hidden overflow-wrap-break-word squeeze-8 squish-16"
          >
            {newsletter.title}
          </h2>
          <article-body class="center-horizontal flex-column squeeze-8">
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html newsletter.html_content}
          </article-body>
        </article>
      </section>
    {/each}
  </section>
</ResponsivePageWrapper>
