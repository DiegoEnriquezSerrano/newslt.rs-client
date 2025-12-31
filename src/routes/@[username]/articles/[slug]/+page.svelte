<script lang="ts">
  // dependencies
  import { MetaTags } from 'svelte-meta-tags';
  // components
  import DynamicPageWrapper from '$lib/Components/Layouts/DynamicPageWrapper.svelte';
  import PublicNewsletterCard from '$lib/Components/PublicNewsletterCard.svelte';
  // enums
  import { NewsletterIssueCardMode } from '$lib/Enums/NewsletterEnums';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<MetaTags
  description={data.newsletter.description}
  title={data.newsletter.title}
  canonical={import.meta.env.BASE_URL}
  openGraph={{
    description: data.newsletter.description,
    images: [
      {
        url: data.newsletter.cover_image_url,
        alt: data.newsletter.title,
      },
    ],
    siteName: 'newslt.rs',
    title: data.newsletter.title,
    url: import.meta.env.BASE_URL,
  }}
  twitter={{
    cardType: 'summary_large_image',
    description: data.newsletter.description,
    image: data.newsletter.cover_image_url,
    imageAlt: data.newsletter.title,
    title: data.newsletter.title,
  }}
/>

<DynamicPageWrapper
  breadcrumbs={data.breadcrumbs}
  footer={data.footer}
  header={data.header}
  navigationOverlay={data.navigationOverlay}
>
  <section class="drop-8">
    <PublicNewsletterCard newsletter={data.newsletter} type={NewsletterIssueCardMode.Content} />
  </section>
</DynamicPageWrapper>
