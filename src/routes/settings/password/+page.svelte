<script lang="ts">
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // components
  import FormButton from '$lib/Components/FormButton.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // helpers
  import { handleHttpResponseError } from '$lib/utils';
  // services
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import UserService from '$lib/Services/UserService';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let currentPassword: string = $state('');
  let newPassword: string = $state('');
  let newPasswordCheck: string = $state('');
  let disabled: boolean = $state(false);

  async function onChangePassword(e: SubmitEvent) {
    e.preventDefault();
    disabled = true;

    const response = await UserService.Api.putPassword({
      currentPassword,
      newPassword,
      newPasswordCheck,
    });

    if (response.ok) {
      FlashMessageService.setMessage({
        type: 'success',
        message: 'Password updated successfully.',
      });

      await goto(resolve('/settings'));
    } else {
      await handleHttpResponseError(response);
    }

    setTimeout(() => (disabled = false), 1_000);
  }
</script>

<ResponsivePageWrapper {...data.responsivePageWrapperOpts}>
  <form
    action="/login"
    method="post"
    class="align-items-start center-horizontal flex-column full-width gap-8 justify-content-start squeeze-16 squish-16"
    style="max-width: 32rem;"
    onsubmit={onChangePassword}
  >
    <input
      class="full-width squeeze-16 squish-16 border-rounded-8 border-style-inset border-color-gray border-width-2 surface-char text-color-white letter-spacing-1 sunken-1"
      id="currentPassword"
      name="currentPassword"
      placeholder="Enter Password"
      type="password"
      required
      bind:value={currentPassword}
    />
    <label
      class="font-weight-bold full-width text-align-start stack-16 text-color-light squeeze-4"
      for="currentPassword"
    >
      Current Password
    </label>
    <input
      class="full-width squeeze-16 squish-16 border-rounded-8 border-style-inset border-color-gray border-width-2 surface-char text-color-white letter-spacing-1 sunken-1"
      id="newPassword"
      name="newPassword"
      placeholder="Enter Password"
      type="password"
      required
      bind:value={newPassword}
    />
    <label
      class="font-weight-bold full-width text-align-start stack-16 text-color-light squeeze-4"
      for="newPassword"
    >
      New Password
    </label>
    <input
      class="full-width squeeze-16 squish-16 border-rounded-8 border-style-inset border-color-gray border-width-2 surface-char text-color-white letter-spacing-1 sunken-1"
      id="newPasswordCheck"
      name="newPasswordCheck"
      placeholder="Enter Password"
      type="password"
      required
      bind:value={newPasswordCheck}
    />
    <label
      class="font-weight-bold full-width text-align-start stack-16 text-color-light squeeze-4"
      for="newPasswordCheck"
    >
      New Password Confirm
    </label>
    <FormButton {disabled} type="submit">Submit</FormButton>
  </form>
</ResponsivePageWrapper>
