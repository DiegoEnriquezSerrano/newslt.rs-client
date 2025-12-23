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
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let content: string = $state('');
  let coverImage: string | ArrayBuffer | null = $state('');
  let description: string = $state('');
  let disabled: boolean = $state(false);
  let title: string = $state('');

  function getCoverImageBaseUrl(
    e: Event & { currentTarget: EventTarget & HTMLInputElement },
  ): void {
    const file = e.currentTarget.files?.item(0) as Blob;
    const reader = new FileReader();

    reader.onloadend = (e) => {
      coverImage = e.target?.result || '';
    };

    reader.readAsDataURL(file);
  }

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

<ResponsivePageWrapper {...data.responsivePageWrapperOpts}>
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
    class="align-items-start center-horizontal flex-column full-width gap-8 justify-content-start squeeze-16 squish-16"
    method="post"
    onsubmit={onSubmitNewsletter}
    style="max-width: 50rem;"
  >
    <fieldset class="full-width squish-0 squeeze-0 gap-8 flex-column stack-24">
      <label
        class="font-weight-bold full-width text-align-start text-color-light squeeze-4"
        for="coverImageUrl"
      >
        Cover Image
      </label>
      <input
        class={[
          'border-color-gray',
          'border-rounded-8',
          'border-style-inset',
          'border-width-2',
          'full-width',
          'letter-spacing-1',
          'line-height-large',
          'squeeze-8',
          'squish-8',
          'sunken-1',
          'surface-char',
          'text-color-white',
        ].join(' ')}
        accept=".jpeg, .png, .jpg, .webp, .svg, .avif, .bmp, .gif"
        id="coverImageUrl"
        name="coverImageUrl"
        onchange={getCoverImageBaseUrl}
        type="file"
        {disabled}
      />
    </fieldset>
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
      id="description"
      limit={200}
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
      required
      bind:value={content}
    />
    <div class="align-items-center flex-row flex-wrap-wrap gap-16 justify-content-start">
      <FormButton {disabled} type="submit">Submit</FormButton>
      {#if disabled}
        <div class="align-items-center flex-row gap-8">
          Processing..
          <div class="flex-row" style="width: var(--spacing-32);">
            <Spinner />
          </div>
        </div>
      {/if}
    </div>
  </form>
</ResponsivePageWrapper>
