<script lang="ts">
  import { resolve } from '$app/paths';
  // components
  import Breadcrumbs from '$lib/Components/Breadcrumbs.svelte';
  import PublicPageWrapper from '$lib/Components/Layouts/PublicPageWrapper.svelte';
  import PublicNewsletterCard from '$lib/Components/PublicNewsletterCard.svelte';
  // enums
  import { NewsletterIssueCardMode } from '$lib/Enums/NewsletterEnums';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<PublicPageWrapper>
  <section class="stack-16">
    <Breadcrumbs
      current={data.slug}
      links={[
        { url: resolve('/'), label: 'Home' },
        { url: resolve('/@[username]', { username: data.username }), label: data.username },
      ]}
    />
  </section>
  <PublicNewsletterCard newsletter={data.newsletter} type={NewsletterIssueCardMode.Content} />
</PublicPageWrapper>
