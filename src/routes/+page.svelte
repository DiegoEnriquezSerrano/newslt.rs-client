<script lang="ts">
  // components
  import PublicNewsletterCard from '$lib/Components/PublicNewsletterCard.svelte';
  import PublicPageWrapper from '$lib/Components/Layouts/PublicPageWrapper.svelte';
  // enums
  import { NewsletterIssueCardMode } from '$lib/Enums/NewsletterEnums';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<PublicPageWrapper>
  {#each data.newsletters as newsletter (newsletter.slug)}
    <PublicNewsletterCard {newsletter} type={NewsletterIssueCardMode.Description} />
  {/each}
</PublicPageWrapper>
