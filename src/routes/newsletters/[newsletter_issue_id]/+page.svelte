<script lang="ts">
  // dependencies
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // classes
  import { Newsletter } from '$lib/Classes/Newsletter';
  // components
  import FormButton from '$lib/Components/FormButton.svelte';
  import NewsletterIssueCard from '$lib/Components/NewsletterIssueCard.svelte';
  import NewslettersHeader from '$lib/Components/NewslettersHeader.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // enums
  import { NewsletterIssueCardMode } from '$lib/Enums/NewsletterEnums';
  // helpers
  import { handleHttpResponseError } from '$lib/utils';
  // services
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import NewsletterService from '$lib/Services/NewsletterService';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  const idempotencyKey = crypto.randomUUID();
  const newsletter = $derived(Newsletter.fromParams(data.newsletter));

  let disabled = $state(false);

  async function onPublishNewsletter(e: SubmitEvent) {
    e.preventDefault();
    disabled = true;

    const response = await NewsletterService.Api.putPublishNewsletter(
      data.newsletter.newsletter_issue_id,
      { idempotencyKey },
    );

    if (response.ok) {
      FlashMessageService.setMessage({
        type: 'success',
        message: 'Newsletter issue published successfully.',
      });

      await goto(resolve('/newsletters'));
    } else {
      await handleHttpResponseError(response);
    }

    setTimeout(() => (disabled = false), 1_000);
  }
</script>

<ResponsivePageWrapper {...data.responsivePageWrapperOpts}>
  <section class="squish-16">
    <NewslettersHeader
      links={[
        { href: resolve('/newsletters/new'), label: 'New' },
        { href: resolve('/newsletters'), label: 'Published' },
      ]}
    >
      <a
        href={resolve(`/newsletters/${data.newsletter.newsletter_issue_id}/edit`)}
        class="text-color-cyan"
      >
        <strong class="squeeze-8">Edit</strong>
      </a>
      {#if !data.newsletter.published_at}
        <form
          action="/admin/newsletters/{data.newsletter.newsletter_issue_id}/publish"
          class="flex-column justify-content-start align-items-start"
          method="post"
          onsubmit={onPublishNewsletter}
        >
          <input type="hidden" id="idempotencyKey" name="idempotencyKey" value={idempotencyKey} />
          <FormButton name="publish" type="submit" {disabled}>Publish</FormButton>
        </form>
      {/if}
    </NewslettersHeader>
  </section>
  <section class="full-width squish-8 stack-24">
    <NewsletterIssueCard {newsletter} type={NewsletterIssueCardMode.Content} />
  </section>
</ResponsivePageWrapper>
