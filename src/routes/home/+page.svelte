<script lang="ts">
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<ResponsivePageWrapper {...data.responsivePageWrapperOpts}>
  <h1>Hello, {data.user.username}!</h1>
</ResponsivePageWrapper>
