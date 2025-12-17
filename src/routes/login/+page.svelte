<script lang="ts">
  import { goto } from '$app/navigation';
  import FormButton from '$lib/Components/FormButton.svelte';
  import AuthenticationService from '$lib/Services/AuthenticationService';
  import FlashMessageService from '$lib/Services/FlashMessageService';

  let disabled: boolean = $state(false);
  let password: string = $state('');
  let username: string = $state('');

  async function onLogin(e: SubmitEvent) {
    e.preventDefault();
    disabled = true;

    const response = await AuthenticationService.Api.postLogin({ username, password });

    if (response.ok) {
      await goto('/home');
    } else if (response.status === 401) {
      const json = await response.json();

      FlashMessageService.setMessage({ type: 'error', message: json.error });
    }

    setTimeout(() => (disabled = false), 1_000);
  }
</script>

<section class="full-width flex-column align-items-center squish-24">
  <h1 class="squeeze-16 line-height-initial">Welcome back!</h1>
  <form
    action="/login"
    class="squish-16 squeeze-16 flex-column gap-8 justify-content-start align-items-center full-width"
    method="post"
    onsubmit={onLogin}
    style="max-width: 35rem;"
  >
    <input
      class="full-width squeeze-16 squish-16 border-rounded-8 border-style-inset border-color-gray border-width-2 surface-char text-color-white letter-spacing-1"
      id="username"
      name="username"
      placeholder="Enter Username"
      type="text"
      required
      bind:value={username}
    />
    <label
      class="font-weight-bold full-width text-align-start stack-16 text-color-light squeeze-4"
      for="username"
    >
      Username
    </label>
    <input
      class="full-width squeeze-16 squish-16 border-rounded-8 border-style-inset border-color-gray border-width-2 surface-char text-color-white letter-spacing-1"
      id="password"
      name="password"
      placeholder="Enter Password"
      type="password"
      required
      bind:value={password}
    />
    <label
      class="font-weight-bold full-width text-align-start stack-16 text-color-light squeeze-4"
      for="password"
    >
      Password
    </label>
    <FormButton type="submit" {disabled}>Login</FormButton>
  </form>
</section>
