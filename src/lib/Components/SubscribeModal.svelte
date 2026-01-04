<script lang="ts">
  // components
  import FormButton from '$lib/Components/FormButton.svelte';
  import Icon from '$lib/Components/Icon.svelte';
  import Modal from '$lib/Components/Modal.svelte';
  // helpers
  import { handleHttpResponseError } from '$lib/utils';
  // services
  import ChallengeService from '$lib/Services/ChallengeService';
  import FlashMessageService from '$lib/Services/FlashMessageService';
  import SubscriptionService from '$lib/Services/SubscriptionService';
  // types
  import type { CaptchaChallenge } from '$lib/Types/ChallengeTypes';

  let {
    show = $bindable(false),
    disabled = $bindable(false),
    challenge = $bindable(null),
    challengeImage = $bindable(null),
    username,
  }: {
    show: boolean;
    disabled: boolean;
    challenge: string | null;
    challengeImage: string | ArrayBuffer | null;
    username: string;
  } = $props();

  let answer = $state('');
  let email = $state('');
  let name = $state('');
  let redoDisabled = $state(false);

  async function onSubscribe(e: SubmitEvent): Promise<void> {
    e.preventDefault();
    disabled = true;

    const response = await SubscriptionService.Api.postSubscribe({
      answer,
      email,
      name,
      signedAnswer: String(challenge),
      username,
    });

    if (response.ok) {
      FlashMessageService.setMessage({
        type: 'success',
        message: 'Subscription confirmation sent. Check your email momentarily.',
      });

      show = false;
    } else {
      handleHttpResponseError(response);
    }

    setTimeout(() => (disabled = false), 1_000);
  }

  async function onRefreshChallenge(): Promise<void> {
    redoDisabled = !redoDisabled;

    const response = await ChallengeService.Api.getCaptcha();

    if (response.ok) {
      const captcha: CaptchaChallenge = await response.json();

      challenge = captcha.challenge;
      challengeImage = captcha.challenge_image;
    }

    setTimeout(() => (redoDisabled = !redoDisabled), 1_000);
  }
</script>

<Modal bind:show size="medium">
  <form onsubmit={onSubscribe} class="flex-column align-items-center justify-content-center">
    <fieldset class="flex-column stack-16 full-width">
      <label
        for="email"
        class="font-weight-bold full-width squeeze-4 text-align-start text-color-light stack-8"
      >
        Email
      </label>
      <input
        class="border-color-gray border-rounded-8 border-style-inset border-width-2 full-width letter-spacing-1 squeeze-8 squish-8 sunken-1 surface-char text-color-white"
        type="email"
        name="email"
        id="email"
        bind:value={email}
      />
    </fieldset>
    <fieldset class="flex-column stack-16 full-width">
      <label
        for="name"
        class="font-weight-bold full-width squeeze-4 text-align-start text-color-light stack-8"
      >
        Name
      </label>
      <input
        class="border-color-gray border-rounded-8 border-style-inset border-width-2 full-width letter-spacing-1 squeeze-8 squish-8 sunken-1 surface-char text-color-white"
        type="text"
        name="name"
        id="name"
        bind:value={name}
      />
    </fieldset>
    <fieldset class="flex-column stack-16 full-width">
      <figure class="flex-row flex-wrap-wrap gap-8 justify-content-center align-items-center">
        <img
          src={challengeImage?.toString()}
          width={320}
          height={120}
          class="stack-16 border-rounded-8"
          alt="Captcha challenge"
          style="height: auto;"
        />
        <button
          disabled={redoDisabled}
          class="surface-char text-color-cyan border-color-gray border-rounded-8 border-style-outset border-width-2 squeeze-8 squish-8 raised-1"
          onclick={onRefreshChallenge}
          type="button"
        >
          <div style="pointer-events: none;" class:dim-50={redoDisabled}>
            <Icon type="redo" fill="var(--color-cyan)" height={[30, 'px']} width={[30, 'px']} />
          </div>
        </button>
      </figure>
      <label
        for="answer"
        class="font-weight-bold full-width squeeze-4 text-align-start text-color-light stack-8"
      >
        Captcha
      </label>
      <input
        class="border-color-gray border-rounded-8 border-style-inset border-width-2 full-width letter-spacing-1 squeeze-8 squish-8 sunken-1 surface-char text-color-white"
        type="text"
        name="answer"
        id="answer"
        bind:value={answer}
      />
    </fieldset>
    <input type="hidden" value={challenge} name="challenge" />
    <FormButton type="submit" name="Subscribe">Subscribe</FormButton>
  </form>
</Modal>
