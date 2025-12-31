<script lang="ts">
  // components
  import DynamicPageWrapper from '$lib/Components/Layouts/DynamicPageWrapper.svelte';
  import Html from '$lib/Components/Html.svelte';
  import Icon from '$lib/Components/Icon.svelte';
  import PublicNewsletterCard from '$lib/Components/PublicNewsletterCard.svelte';
  // enums
  import { NewsletterIssueCardMode } from '$lib/Enums/NewsletterEnums';
  // helpers
  import { classList } from '$lib/utils';
  // stores
  import { viewWidth } from '$lib/Stores/LayoutStore';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();

  let avatarSize: number = $derived($viewWidth < 650 ? 100 : 125);
</script>

<DynamicPageWrapper
  breadcrumbs={data.breadcrumbs}
  footer={data.footer}
  header={data.header}
  navigationOverlay={data.navigationOverlay}
>
  <section
    class="border-color-gray border-rounded-16 border-style-outset border-width-2 center-horizontal overflow-hidden raised-1 stack-24 drop-8"
    style="max-width: 40rem;"
  >
    <div>
      <div class="full-width" style="aspect-ratio: calc(4 / 1);">
        <img
          alt="Profile banner for {data.user.username}"
          class="border-width-0 border-bottom-width-2 border-style-outset border-color-gray"
          src={data.user.banner_url}
        />
      </div>
      <div
        class="grid align-items-start gap-8 squeeze-8"
        style="grid-template-columns: {avatarSize}px 1fr;"
      >
        <div
          class={classList([
            'aspect-ratio-medium-format',
            'border-color-gray',
            'border-rounded-circle',
            'border-style-outset',
            'border-width-3',
            'display-inline-flex',
            'overflow-hidden',
            'raised-1',
            'surface-char',
          ])}
          style="margin-top: calc(calc({avatarSize} / 2) * -1px);"
        >
          {#if Boolean(data.user.avatar_url.trim())}
            <img
              alt="avatar for {data.user.username}"
              class="surface-char"
              height={avatarSize}
              src={data.user.avatar_url}
              width={avatarSize}
            />
          {:else}
            <Icon
              fill="var(--color-cyan)"
              height={[avatarSize, 'px']}
              stroke="var(--color-cyan)"
              type="userFill"
              width={[avatarSize, 'px']}
            />
          {/if}
        </div>
        <div>
          <p class="font-weight-bold text-color-light text-shadow-1 dim-70">
            @{data.user.username}
          </p>
          <h3 class="stack-8">{data.user.display_name}</h3>
        </div>
      </div>
    </div>
    {#if Boolean(data.user.bio.trim())}
      <p class="squeeze-16 squish-8 stack-8">
        <Html markupText={data.user.bio} />
      </p>
    {/if}
  </section>
  {#each data.newsletters as newsletter (newsletter.slug)}
    <PublicNewsletterCard {newsletter} type={NewsletterIssueCardMode.Description} />
  {/each}
</DynamicPageWrapper>
