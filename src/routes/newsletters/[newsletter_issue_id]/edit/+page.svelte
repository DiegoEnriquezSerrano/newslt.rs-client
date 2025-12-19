<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // components
  import ExpandingTextarea from '$lib/Components/ExpandingTextarea.svelte';
  import FormButton from '$lib/Components/FormButton.svelte';
  import InputWithCounter from '$lib/Components/InputWithCounter.svelte';
  import NewslettersHeader from '$lib/Components/NewslettersHeader.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // services
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import NewsletterService from '$lib/Services/NewsletterService';
  // types
  import type { PageProps } from './$types';
  import type { ResolvedPathname } from '$app/types';

  let { data }: PageProps = $props();

  let title: string = $derived(data.newsletter.title);
  let content: string = $derived(data.newsletter.content);
  let description: string = $derived(data.newsletter.description);
  let disabled: boolean = $state(false);
  let breadcrumbs: { url: ResolvedPathname; label: string }[] = $state([]);

  $effect(() => {
    if (!data.newsletter.published_at) {
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

  async function onSubmitNewsletter(e: SubmitEvent) {
    e.preventDefault();
    disabled = true;

    const response = await NewsletterService.Api.putNewsletter(
      data.newsletter.newsletter_issue_id,
      {
        title,
        content,
        description,
      },
    );

    if (response.ok) {
      await goto(resolve(`/newsletters/${data.newsletter.newsletter_issue_id}`));
    } else if (response.status === 422) {
      const json = await response.json();

      FlashMessageService.setMessage({ type: 'error', message: json.error });
    }

    setTimeout(() => (disabled = false), 1_000);
  }
</script>

<ResponsivePageWrapper
  breadcrumbs={{ links: breadcrumbs, current: 'Edit' }}
  footer={{
    links: [
      { label: 'Home', href: resolve('/home'), icon: 'home' },
      { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
    ],
  }}
  header={{ title: data.newsletter.slug }}
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
        { href: resolve('/newsletters'), label: 'Published' },
      ]}
    />
  </section>
  <form
    action="/login"
    method="post"
    class="align-items-start center-horizontal flex-column full-width gap-8 justify-content-start squeeze-16 squish-16"
    onsubmit={onSubmitNewsletter}
    style="max-width: 50rem;"
  >
    <label
      class="font-weight-bold full-width squeeze-4 text-align-start text-color-light"
      for="title"
    >
      Title
    </label>
    <InputWithCounter
      id="title"
      limit={70}
      name="title"
      placeholder="Enter title"
      required={true}
      type="text"
      bind:value={title}
    />
    <label
      class="font-weight-bold full-width squeeze-4 text-align-start text-color-light"
      for="description"
    >
      Description
    </label>
    <ExpandingTextarea
      limit={200}
      id="description"
      name="description"
      placeholder="Enter description"
      required={true}
      bind:value={description}
    />
    <label
      class="font-weight-bold full-width squeeze-4 text-align-start text-color-light"
      for="content-body"
    >
      Content body <sup>(Markdown allowed)</sup>
    </label>
    <ExpandingTextarea
      id="content-body"
      name="content-body"
      placeholder="Enter content body"
      required={true}
      bind:value={content}
    />
    <FormButton {disabled} type="submit">Update</FormButton>
  </form>
</ResponsivePageWrapper>
