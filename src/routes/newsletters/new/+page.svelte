<script lang="ts">
  // dependencies
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // components
  import ExpandingTextarea from '$lib/Components/ExpandingTextarea.svelte';
  import FormButton from '$lib/Components/FormButton.svelte';
  import InputWithCounter from '$lib/Components/InputWithCounter.svelte';
  import NewslettersHeader from '$lib/Components/NewslettersHeader.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  import Spinner from '$lib/Components/Spinner.svelte';
  // services
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import NewsletterService from '$lib/Services/NewsletterService';

  let content: string = $state('');
  let description: string = $state('');
  let disabled: boolean = $state(false);
  let title: string = $state('');

  async function onSubmitNewsletter(e: SubmitEvent) {
    e.preventDefault();
    disabled = true;

    const response = await NewsletterService.Api.postNewsletter({
      content,
      description,
      title,
    });

    if (response.ok) {
      await goto(resolve('/newsletters/drafts'));
    } else {
      const json = await response.json();

      FlashMessageService.setMessage({ type: 'error', message: json.error });
    }

    setTimeout(() => (disabled = false), 1_000);
  }
</script>

<ResponsivePageWrapper
  breadcrumbs={{
    links: [
      { url: resolve('/home'), label: 'Home' },
      { url: resolve('/newsletters'), label: 'Newsletters' },
    ],
    current: 'New',
  }}
  header={{ title: 'New' }}
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
        { href: resolve('/newsletters'), label: 'Published' },
        { href: resolve('/newsletters/drafts'), label: 'Drafts' },
      ]}
    />
  </section>
  <form
    action="/login"
    class="squish-16 squeeze-16 flex-column gap-8 justify-content-start align-items-start full-width"
    method="post"
    onsubmit={onSubmitNewsletter}
    style="max-width: 50rem;"
  >
    <label
      class="font-weight-bold full-width text-align-start text-color-light squeeze-4"
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
      class="font-weight-bold full-width text-align-start text-color-light squeeze-4"
      for="description"
    >
      Description
    </label>
    <ExpandingTextarea
      id="description"
      limit={200}
      name="description"
      placeholder="Enter description"
      required={true}
      bind:value={description}
    />
    <label
      class="font-weight-bold full-width text-align-start text-color-light squeeze-4"
      for="content-body"
    >
      Content body <sup>(Markdown allowed)</sup>
    </label>
    <ExpandingTextarea
      id="content-body"
      name="content-body"
      placeholder="Enter content body"
      required
      bind:value={content}
    />
    <div class="flex-row justify-content-start align-items-center gap-16 flex-wrap-wrap">
      <FormButton {disabled} type="submit">Submit</FormButton>
      {#if disabled}
        <div class="flex-row align-items-center gap-8">
          Processing..
          <div class="flex-row" style="width: var(--spacing-32);">
            <Spinner />
          </div>
        </div>
      {/if}
    </div>
  </form>
</ResponsivePageWrapper>
