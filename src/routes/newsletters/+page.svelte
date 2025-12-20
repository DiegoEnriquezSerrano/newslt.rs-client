<script lang="ts">
  // dependencies
  import { resolve } from '$app/paths';
  // components
  import NewsletterIssueCard from '$lib/Components/NewsletterIssueCard.svelte';
  import NewslettersHeader from '$lib/Components/NewslettersHeader.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // enums
  import { NewsletterIssueCardMode } from '$lib/Enums/NewsletterEnums';
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
  <section class="squish-16">
    <NewslettersHeader
      links={[
        { href: resolve('/newsletters/new'), label: 'New' },
        { href: resolve('/newsletters/drafts'), label: 'Drafts' },
      ]}
    />
  </section>
  <section class="full-width squish-8">
    {#each data.newsletters as newsletter (newsletter.newsletter_issue_id)}
      <section class="stack-24">
        <NewsletterIssueCard {newsletter} type={NewsletterIssueCardMode.Description} />
      </section>
    {/each}
  </section>
</ResponsivePageWrapper>
