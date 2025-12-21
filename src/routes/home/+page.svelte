<script>
  import { resolve } from '$app/paths';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
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
  <h1>Hello, user!</h1>
</ResponsivePageWrapper>
