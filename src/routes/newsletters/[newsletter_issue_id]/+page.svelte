<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // classes
  import { Newsletter } from '$lib/Classes/Newsletter';
  // components
  import FormButton from '$lib/Components/FormButton.svelte';
  import NewslettersHeader from '$lib/Components/NewslettersHeader.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // services
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import NewsletterService from '$lib/Services/NewsletterService';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  // types
  import type { PageProps } from './$types';
  import type { ResolvedPathname } from '$app/types';

  let { data }: PageProps = $props();

  const idempotencyKey = crypto.randomUUID();
  const newsletter = $derived(Newsletter.fromParams(data.newsletter));

  let disabled = $state(false);
  let breadcrumbs: { url: ResolvedPathname; label: string }[] = $state([]);

  $effect(() => {
    if (!newsletter.published_at) {
      breadcrumbs = Array.from(
        new Set([
          { url: resolve('/home'), label: 'Dashboard' },
          { url: resolve('/newsletters'), label: 'Newsletters' },
          { url: resolve('/newsletters/drafts'), label: 'Drafts' },
        ]),
      );
    } else {
      breadcrumbs = Array.from(
        new Set([
          { url: resolve('/home'), label: 'Dashboard' },
          { url: resolve('/newsletters'), label: 'Newsletters' },
        ]),
      );
    }
  });

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
    } else if (response.status == 422) {
      const json = await response.json();

      FlashMessageService.setMessage({ message: json.error, type: 'error' });
    }

    setTimeout(() => (disabled = false), 1_000);
  }
</script>

<ResponsivePageWrapper
  breadcrumbs={{
    links: breadcrumbs,
    current: data.newsletter.slug,
  }}
  header={{ title: data.newsletter.slug }}
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
  <section class="squish-8">
    <NewslettersHeader
      links={[
        { href: resolve('/newsletters/new'), label: 'New' },
        { href: resolve('/newsletters'), label: 'Published' },
      ]}
    >
      {#if !data.newsletter.published_at}
        <form
          action="/admin/newsletter/{data.newsletter.newsletter_issue_id}/publish"
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
    <article
      class="border-width-2 border-rounded-16 border-color-gray border-style-outset raised-1 center-horizontal"
      class:squeeze-8={$viewWidth < 650}
      class:squeeze-16={$viewWidth > 650}
      class:squish-8={$viewWidth < 650}
      class:squish-16={$viewWidth > 650}
      style="max-width: 52rem;"
    >
      <h2
        class="full-width line-height-extra-large overflow-wrap-break-word overflow-hidden squeeze-8 squish-16 center-horizontal"
      >
        {newsletter.title}
      </h2>
      {#if !newsletter.isDraft}
        <p class="center-horizontal dim-70 squeeze-8 squish-8 text-color-white">
          {newsletter.publishedAtDate} at {newsletter.publishedAtTime}
        </p>
      {/if}
      <article-body class="center-horizontal flex-column squeeze-8">
        <!-- eslint-disable svelte/no-at-html-tags -->
        {@html newsletter.html_content}
      </article-body>
    </article>
  </section>
</ResponsivePageWrapper>
