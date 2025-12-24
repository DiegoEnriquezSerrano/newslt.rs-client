<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  import { resolve } from '$app/paths';
  // classes
  import { Newsletter } from '$lib/Classes/Newsletter';
  // components
  import CoverImage from '$lib/Components/CoverImage.svelte';
  // enums
  import { NewsletterIssueCardMode } from '$lib/Enums/NewsletterEnums';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  // types
  import type { NewsletterType } from '$lib/Types/NewsletterTypes';

  let { newsletter, type }: { newsletter: NewsletterType; type: NewsletterIssueCardMode } =
    $props();

  const newsletterIssue = $derived(Newsletter.fromParams(newsletter));
</script>

<article
  class="border-width-2 border-rounded-16 border-color-gray border-style-outset raised-1 center-horizontal"
  class:large={type === NewsletterIssueCardMode.Content}
  class:squeeze-8={$viewWidth < 650}
  class:squeeze-16={$viewWidth > 650}
  class:squish-8={$viewWidth < 650}
  class:squish-16={$viewWidth > 650}
  in:fly={{ y: -50, duration: 250, delay: 100, easing: quintOut }}
>
  <CoverImage
    src={newsletterIssue.cover_image_url}
    alt="Cover image for article: '{newsletterIssue.title}'"
  />
  <h2
    class="full-width line-height-extra-large overflow-wrap-break-word overflow-hidden squeeze-8 squish-16 center-horizontal"
  >
    {#if type == NewsletterIssueCardMode.Description}
      <a
        class="text-color-cyan"
        href={resolve(`/newsletters/${newsletterIssue.newsletter_issue_id}`)}
      >
        {newsletterIssue.title}
      </a>
    {:else}
      {newsletterIssue.title}
    {/if}
  </h2>
  {#if !newsletterIssue.isDraft}
    <p class="center-horizontal dim-70 squeeze-8 squish-8 text-color-white">
      {newsletterIssue.publishedAtDate} at {newsletterIssue.publishedAtTime}
    </p>
  {/if}
  {#if type == NewsletterIssueCardMode.Description}
    <p class="squeeze-8 stack-16">
      {newsletterIssue.description}
    </p>
  {:else}
    <article-body class="center-horizontal flex-column squeeze-8">
      <!-- eslint-disable svelte/no-at-html-tags -->
      {@html newsletterIssue.html_content}
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
