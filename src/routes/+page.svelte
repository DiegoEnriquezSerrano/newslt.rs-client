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
  <section class="full-width stack-16">
    {#each data.newsletters as newsletter (newsletter.slug)}
      <section class="stack-24">
        <PublicNewsletterCard {newsletter} type={NewsletterIssueCardMode.Description} />
      </section>
    {/each}
  </section>
</PublicPageWrapper>
