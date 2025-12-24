<script lang="ts">
  // dependencies
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // helpers
  import { classList, handleHttpResponseError } from '$lib/utils';
  // components
  import ExpandingTextarea from '$lib/Components/ExpandingTextarea.svelte';
  import FormButton from '$lib/Components/FormButton.svelte';
  import InputWithCounter from '$lib/Components/InputWithCounter.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  import UpdateProfileBannerModal from '$lib/Components/UpdateProfileBannerModal.svelte';
  // services
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import UserService from '$lib/Services/UserService';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let bio = $derived(data.user.bio);
  let description = $derived(data.user.description);
  let disabled = $state(false);
  let displayName = $derived(data.user.display_name);
  let showBannerModal = $state(false);

  async function onUpdateProfile(e: SubmitEvent) {
    e.preventDefault();
    disabled = true;

    const response = await UserService.Api.putAuthUpdateProfile({
      bio,
      description,
      displayName,
    });

    if (response.ok) {
      FlashMessageService.setMessage({
        message: 'Profile updated successfully.',
        type: 'success',
      });

      await goto(resolve('/profile'));
    } else {
      await handleHttpResponseError(response);
    }

    setTimeout(() => (disabled = false), 1_000);
  }

  function openBannerModal() {
    showBannerModal = true;
  }
</script>

<ResponsivePageWrapper {...data.responsivePageWrapperOpts}>
  <section class="squeeze-8 squish-8 stack-16">
    <div class="align-items-start center-horizontal flex-row" style="max-width: 50rem;">
      <div
        class={classList([
          'align-items-start',
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
        style="background-image: url({data.user.banner_url}); min-height: 160px;"
      >
        <button
          onclick={openBannerModal}
          class={[
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
          ]}
        >
          Banner
        </button>
      </div>
    </div>
  </section>
  <section class="full-width flex-column align-items-start squeeze-8">
    <form
      action="/admin/user"
      method="post"
      class="align-items-start center-horizontal flex-column full-width gap-8 justify-content-start"
      onsubmit={onUpdateProfile}
      style="max-width: 50rem;"
    >
      <fieldset class="full-width squish-0 squeeze-0 gap-8 flex-column">
        <label
          class="font-weight-bold full-width text-align-start text-color-light squeeze-4"
          for="displayName"
        >
          Display name
        </label>
        <InputWithCounter
          id="displayName"
          limit={70}
          name="displayName"
          placeholder="Enter display name"
          type="text"
          bind:value={displayName}
        />
      </fieldset>
      <fieldset class="stack-8 full-width squish-0 squeeze-0 gap-8 flex-column">
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
          placeholder="Enter Description"
          bind:value={description}
        />
      </fieldset>
      <fieldset class="stack-8 full-width squish-0 squeeze-0 gap-8 flex-column">
        <label
          class="font-weight-bold full-width text-align-start text-color-light squeeze-4"
          for="bio"
        >
          Bio
        </label>
        <ExpandingTextarea id="bio" name="bio" placeholder="Enter Bio" bind:value={bio} />
      </fieldset>
      <FormButton {disabled} type="submit">Submit</FormButton>
    </form>
  </section>
</ResponsivePageWrapper>
<UpdateProfileBannerModal bind:show={showBannerModal} bind:disabled />
