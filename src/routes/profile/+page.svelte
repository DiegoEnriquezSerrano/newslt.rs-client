<script lang="ts">
  // dependencies
  import { resolve } from '$app/paths';
  // components
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // helpers
  import { classList } from '$lib/utils';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<ResponsivePageWrapper
  breadcrumbs={{
    links: [{ url: resolve('/home'), label: 'Dashboard' }],
    current: 'Profile',
  }}
  header={{
    title: 'Home',
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
  <header
    class="align-items-center center-horizontal flex-row full-width justify-content-end"
    style="max-width: 42rem;"
  >
    <section class="align-items-center flex-row">
      <a href={resolve(`/profile/edit`)} class="display-inline-flex text-color-cyan">
        <strong class="squeeze-8 squish-8">Edit</strong>
      </a>
    </section>
  </header>
  <section
    class={classList([
      'border-color-gray',
      'border-rounded-16',
      'border-style-outset',
      'border-width-2',
      'center-horizontal',
      'overflow-hidden',
      'raised-1',
      'stack-24',
    ])}
    style="max-width: 40rem;"
  >
    <div class="squeeze-16 squish-16">
      <div class="grid align-items-start gap-8" style="grid-template-columns: 50px 1fr;">
        <div>
          <p class="font-weight-bold text-color-light text-shadow-1 dim-70">
            @{data.user.username}
          </p>
          <h3>{data.user.display_name}</h3>
        </div>
      </div>
    </div>
    {#if Boolean(data.user.bio.trim())}
      <p class="squeeze-16 squish-8 stack-8">
        {data.user.bio}
      </p>
    {/if}
  </section>
</ResponsivePageWrapper>
