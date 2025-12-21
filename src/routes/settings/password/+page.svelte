<script lang="ts">
  // components
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<ResponsivePageWrapper {...data.responsivePageWrapperOpts}>Hello</ResponsivePageWrapper>
