<script lang="ts">
  // dependencies
  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  // components
  import FormButton from '$lib/Components/FormButton.svelte';
  // services
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
      await goto(resolve('/home'));
    } else if (response.status === 401) {
      const json = await response.json();

      FlashMessageService.setMessage({ type: 'error', message: json.error });
    }

    setTimeout(() => (disabled = false), 1_000);
  }
</script>

<section class="align-items-center flex-column full-width squish-24">
  <h1 class="line-height-initial squeeze-16">Welcome back!</h1>
  <form
    action="/login"
    class="align-items-center flex-column full-width gap-8 justify-content-start squeeze-16 squish-16"
    method="post"
    onsubmit={onLogin}
    style="max-width: 35rem;"
  >
    <input
      class="border-color-gray border-rounded-8 border-style-inset border-width-2 full-width letter-spacing-1 squeeze-16 squish-16 surface-char text-color-white"
      id="username"
      name="username"
      placeholder="Enter Username"
      required
      type="text"
      bind:value={username}
    />
    <label
      class="font-weight-bold full-width squeeze-4 stack-16 text-align-start text-color-light"
      for="username"
    >
      Username
    </label>
    <input
      class="border-color-gray border-rounded-8 border-style-inset border-width-2 full-width letter-spacing-1 squeeze-16 squish-16 surface-char text-color-white"
      id="password"
      name="password"
      placeholder="Enter Password"
      required
      type="password"
      bind:value={password}
    />
    <label
      class="font-weight-bold full-width squeeze-4 stack-16 text-align-start text-color-light"
      for="password"
    >
      Password
    </label>
    <FormButton type="submit" {disabled}>Login</FormButton>
  </form>
</section>
