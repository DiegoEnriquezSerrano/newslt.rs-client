<script lang="ts">
  // dependencies
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // components
  import FormButton from '$lib/Components/FormButton.svelte';
  import Modal from '$lib/Components/Modal.svelte';
  import Spinner from '$lib/Components/Spinner.svelte';
  // helpers
  import { handleHttpResponseError } from '$lib/utils';
  // services
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import UserService from '$lib/Services/UserService';

  let {
    show = $bindable(false),
    disabled = $bindable(false),
  }: { show: boolean; disabled: boolean } = $props();

  let banner: string | ArrayBuffer | null = $state(null);

  function getBannerBaseUrl(e: Event & { currentTarget: EventTarget & HTMLInputElement }): void {
    const file = e.currentTarget.files?.item(0) as Blob;
    const reader = new FileReader();

    reader.onloadend = (e) => {
      banner = e.target?.result || null;
    };

    reader.readAsDataURL(file);
  }

  async function onUpdateProfileBanner(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    disabled = true;

    const response = await UserService.Api.putAuthUpdateProfileBanner({
      bannerUrl: String(banner),
    });

    if (response.ok) {
      FlashMessageService.setMessage({
        type: 'success',
        message: 'Profile banner updated successfully.',
      });

      await goto(resolve('/profile'));
    } else {
      await handleHttpResponseError(response);
    }

    setTimeout(() => (disabled = false), 1_000);
  }
</script>

<Modal bind:show size="medium">
  <section
    class="flex-row align-items-center justify-content-center surface-black border-color-gray border-style-outset border-width-2 drop-16"
    style="aspect-ratio: calc(4/1);"
  >
    {#if !banner}
      <div class="full-height full-width">&nbsp;</div>
    {:else}
      <img
        style="max-height: 100%; width: max-content;"
        src={banner.toString()}
        alt="New banner preview"
      />
    {/if}
  </section>
  <form
    action="/admin/user/banner"
    method="post"
    class="squish-16 flex-column gap-8 justify-content-start align-items-start full-width"
    style="max-width: 40rem;"
    onsubmit={onUpdateProfileBanner}
  >
    <fieldset class="full-width squish-0 squeeze-0 gap-8 flex-column stack-24">
      <label
        class="font-weight-bold full-width text-align-start text-color-light squeeze-4"
        for="bannerUrl"
      >
        Banner
      </label>
      <input
        accept=".jpeg, .png, .jpg, .webp, .svg, .avif, .bmp, .gif"
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
        id="bannerUrl"
        name="bannerUrl"
        onchange={getBannerBaseUrl}
        type="file"
        {disabled}
      />
    </fieldset>
    <div class="flex-row justify-content-start align-items-center gap-16 flex-wrap-wrap">
      <FormButton {disabled} type="submit">Update banner</FormButton>
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
