<script lang="ts">
  import { resolve } from '$app/paths';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<ResponsivePageWrapper
  header={{ title: 'Home' }}
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
  <h1>Hello, {data.user.username}!</h1>
</ResponsivePageWrapper>
