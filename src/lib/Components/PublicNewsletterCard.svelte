<script lang="ts">
  // dependencies
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  // classes
  import { PublicNewsletter } from '$lib/Classes/Newsletter';
  // components
  import CoverImage from '$lib/Components/CoverImage.svelte';
  import Icon from '$lib/Components/Icon.svelte';
  // enums
  import { NewsletterIssueCardMode } from '$lib/Enums/NewsletterEnums';
  // helpers
  import { classList } from '$lib/utils';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  // types
  import type { PublicNewsletterType } from '$lib/Types/NewsletterTypes';

  let { newsletter, type }: { newsletter: PublicNewsletterType; type: NewsletterIssueCardMode } =
    $props();

  const newsletterIssue = $derived(PublicNewsletter.fromParams(newsletter));
</script>

<article
  class="border-color-gray border-rounded-16 border-style-outset border-width-2 center-horizontal raised-1 stack-24"
  class:large={type === NewsletterIssueCardMode.Content}
  class:squeeze-8={$viewWidth < 650}
  class:squeeze-16={$viewWidth > 650}
  class:squish-8={$viewWidth < 650}
  class:squish-16={$viewWidth > 650}
  in:fly={{ y: -50, duration: 250, delay: 100, easing: quintOut }}
>
  <a href={newsletterIssue.articleHref}>
    <CoverImage
      src={newsletterIssue.cover_image_url}
      alt="Cover image for newsletter issue: '{newsletterIssue.title}'"
    />
  </a>
  <h2
    class="center-horizontal full-width line-height-extra-large overflow-hidden overflow-wrap-break-word squeeze-8 squish-16"
    class:drop-8={!newsletterIssue.hasCoverImage}
  >
    {#if type == NewsletterIssueCardMode.Description}
      <a class="text-color-cyan" href={newsletterIssue.articleHref}>
        {newsletterIssue.title}
      </a>
    {:else}
      {newsletterIssue.title}
    {/if}
  </h2>
  <div
    class="align-items-stretch center-horizontal flex-row justify-content-start squeeze-8 squish-8"
  >
    <a
      href={newsletterIssue.userHref}
      class={classList([
        'aspect-ratio-medium-format',
        'border-color-gray',
        'border-rounded-circle',
        'border-style-outset',
        'border-width-2',
        'display-inline-flex',
        'overflow-hidden',
        'raised-1',
        'surface-char',
      ])}
    >
      {#if newsletterIssue.user.hasAvatarImage}
        <img
          alt="avatar for {newsletterIssue.user.username}"
          class="surface-char"
          height={50}
          src={newsletterIssue.user.avatar_url}
          width={50}
        />
      {:else}
        <Icon
          fill="var(--color-cyan)"
          height={[50, 'px']}
          stroke="var(--color-cyan)"
          type="userFill"
          width={[50, 'px']}
        />
      {/if}
    </a>
    <div class="flex-column justify-content-space-evenly squeeze-8">
      <a
        class="dim-70 text-color-white text-shadow-1 hover-decoration-none"
        href={newsletterIssue.userHref}
      >
        @{newsletterIssue.user.username}
      </a>
      {#if newsletterIssue.user.hasDisplayName}
        <a href={newsletterIssue.userHref} class="text-color-cyan">
          {newsletterIssue.user.display_name}
        </a>
      {/if}
    </div>
  </div>
  <a
    href={newsletterIssue.articleHref}
    class="center-horizontal dim-70 display-inline-flex hover-decoration-none squeeze-8 squish-8 text-color-light"
  >
    {newsletterIssue.publishedAtDate} at {newsletterIssue.publishedAtTime}
  </a>
  {#if type == NewsletterIssueCardMode.Description}
    <p class="squeeze-8 stack-16">
      {newsletterIssue.description}
    </p>
  {:else}
    <article-body class="center-horizontal flex-column squeeze-8">
      {@html newsletterIssue.content}
    </article-body>
  {/if}
</article>

<style>
  article {
    max-width: 40rem;
  }

  article.large {
    max-width: 52rem;
  }

  article.large * {
    max-width: 40rem;
  }
</style>
