<script lang="ts">
  // dependencies
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // helpers
  import { handleHttpResponseError } from '$lib/utils';
  // components
  import ExpandingTextarea from '$lib/Components/ExpandingTextarea.svelte';
  import FormButton from '$lib/Components/FormButton.svelte';
  import InputWithCounter from '$lib/Components/InputWithCounter.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
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
</script>

<ResponsivePageWrapper
  breadcrumbs={{
    links: [
      { url: resolve('/home'), label: 'Dashboard' },
      { url: resolve('/profile'), label: 'Profile' },
    ],
    current: 'Update profile',
  }}
  header={{
    title: 'Dashboard',
  }}
  footer={{
    links: [
      { label: 'Home', href: resolve('/home'), icon: 'home' },
      { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
      { label: 'Profile', href: resolve('/profile'), icon: 'profile' },
    ],
  }}
  navigationOverlay={{
    links: [
      { label: 'Home', href: resolve('/home'), icon: 'home' },
      { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
      { label: 'Profile', href: resolve('/profile'), icon: 'profile' },
    ],
  }}
>
  <section class="full-width flex-column align-items-start squeeze-8">
    <form
      action="/login"
      method="post"
      class="align-items-start center-horizontal flex-column full-width gap-8 justify-content-start squeeze-16 squish-16"
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
