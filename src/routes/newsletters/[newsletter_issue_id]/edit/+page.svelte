<script lang="ts">
  // dependencies
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // components
  import ExpandingTextarea from '$lib/Components/ExpandingTextarea.svelte';
  import FormButton from '$lib/Components/FormButton.svelte';
  import InputWithCounter from '$lib/Components/InputWithCounter.svelte';
  import Modal from '$lib/Components/Modal.svelte';
  import NewslettersHeader from '$lib/Components/NewslettersHeader.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  import Spinner from '$lib/Components/Spinner.svelte';
  // helpers
  import { classList, handleHttpResponseError } from '$lib/utils';
  // services
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import NewsletterService from '$lib/Services/NewsletterService';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let content: string = $derived(data.newsletter.content);
  let description: string = $derived(data.newsletter.description);
  let disabled: boolean = $state(false);
  let photo: string | ArrayBuffer | null = $state(null);
  let showCoverImageModal = $state(false);
  let title: string = $derived(data.newsletter.title);

  function getImageBaseUrl(e: Event & { currentTarget: EventTarget & HTMLInputElement }): void {
    const file = e.currentTarget.files?.item(0) as Blob;
    const reader = new FileReader();

    reader.onloadend = (e) => {
      photo = e.target?.result || null;
    };

    reader.readAsDataURL(file);
  }

  async function onUpdateCoverImage(e: SubmitEvent) {
    e.preventDefault();
    disabled = true;

    const response = await NewsletterService.Api.putUpdateNewsletterCoverImage(
      data.newsletter.newsletter_issue_id,
      {
        image: String(photo),
      },
    );

    if (response.ok) {
      FlashMessageService.setMessage({
        type: 'success',
        message: 'Cover image updated successfully.',
      });

      await goto(resolve(`/newsletters/${data.newsletter.newsletter_issue_id}`));
    } else {
      handleHttpResponseError(response);
    }

    setTimeout(() => (disabled = false), 1_000);
  }

  async function onUpdateNewsletter(e: SubmitEvent) {
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
      FlashMessageService.setMessage({
        type: 'success',
        message: 'Newsletter updated successfully.',
      });

      await goto(resolve(`/newsletters/${data.newsletter.newsletter_issue_id}`));
    } else {
      handleHttpResponseError(response);
    }

    setTimeout(() => (disabled = false), 1_000);
  }

  function openCoverImageModal() {
    showCoverImageModal = true;
  }
</script>

<ResponsivePageWrapper {...data.responsivePageWrapperOpts}>
  <section class="squish-16">
    <NewslettersHeader
      links={[
        { href: resolve('/newsletters/new'), label: 'New' },
        { href: resolve('/newsletters'), label: 'Published' },
      ]}
    />
  </section>
  <section class="center-horizontal squeeze-16 squish-16" style="max-width: 50rem;">
    <div class="flex-row align-items-start">
      <div
        class={classList([
          'align-items-start',
          'aspect-ratio-hd',
          'background-position-x-center',
          'background-position-y-center',
          'background-repeat-no-repeat',
          'background-size-cover',
          'border-color-gray',
          'border-style-outset',
          'border-width-2',
          'flex-row',
          'full-width',
          'justify-content-end',
          'overflow-hidden',
          'raised-1',
        ])}
        style="background-image: url({data.newsletter.cover_image_url});"
      >
        <button
          onclick={openCoverImageModal}
          class={classList([
            'border-color-gray',
            'border-rounded-8',
            'border-style-outset',
            'border-width-2',
            'cursor-pointer',
            'drop-8',
            'font-weight-bold',
            'pull-8',
            'raised-1',
            'squeeze-16',
            'squish-8',
            'surface-char',
            'text-color-light',
            'text-color-white',
          ])}
        >
          Cover Image
        </button>
      </div>
    </div>
  </section>
  <section class="full-width flex-column align-items-start squeeze-8">
    <form
      action="/login"
      method="post"
      class="align-items-start center-horizontal flex-column full-width gap-8 justify-content-start squeeze-16 squish-16"
      onsubmit={onUpdateNewsletter}
      style="max-width: 50rem;"
    >
      <fieldset class="full-width squish-0 squeeze-0 gap-8 flex-column">
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
      </fieldset>
      <fieldset class="full-width squish-0 squeeze-0 gap-8 flex-column">
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
      </fieldset>
      <fieldset class="full-width squish-0 squeeze-0 gap-8 flex-column">
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
      </fieldset>
      <FormButton {disabled} type="submit">Update</FormButton>
    </form>
  </section>
</ResponsivePageWrapper>
<Modal bind:show={showCoverImageModal} size="medium">
  <section
    class="flex-row align-items-center justify-content-center surface-black border-color-gray border-style-outset border-width-2 drop-16 aspect-ratio-hd"
  >
    {#if !photo}
      <div class="full-height full-width">&nbsp;</div>
    {:else}
      <img
        style="max-height: 100%; width: max-content;"
        src={photo.toString()}
        alt="New cover preview"
      />
    {/if}
  </section>
  <form
    action="/login"
    method="post"
    class="squish-16 flex-column gap-8 justify-content-start align-items-start full-width"
    style="max-width: 40rem;"
    onsubmit={onUpdateCoverImage}
  >
    <fieldset class="full-width squish-0 squeeze-0 gap-8 flex-column stack-24">
      <label
        class="font-weight-bold full-width text-align-start text-color-light squeeze-4"
        for="coverImage"
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
        id="coverImage"
        name="coverImage"
        type="file"
        onchange={getImageBaseUrl}
      />
    </fieldset>
    <div class="flex-row justify-content-start align-items-center gap-16 flex-wrap-wrap">
      <FormButton {disabled} type="submit">Update cover image</FormButton>
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
</Modal>
