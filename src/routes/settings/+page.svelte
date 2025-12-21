<script lang="ts">
  // dependencies
  import { resolve } from '$app/paths';
  // components
  import Icon from '$lib/Components/Icon.svelte';
  import ResponsivePageWrapper from '$lib/Components/Layouts/ResponsivePageWrapper.svelte';
  // types
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
</script>

<ResponsivePageWrapper {...data.responsivePageWrapperOpts}>
  <nav
    class="full-width flex-column align-items-start squish-16 squeeze-8"
    style="max-width: 32rem;"
  >
    <div
      class="flex-column full-width justify-content-center align-items-start gap-8 raised-1 border-style-outset border-color-gray border-width-2 squish-16 squeeze-16 border-rounded-8"
    >
      <a
        class="full-width text-color-cyan flex-row justify-content-space-between gap-8 squish-8"
        href={resolve('/settings/password')}
      >
        <div class="flex-row align-items-center justify-content-start gap-8">
          <Icon fill="var(--color-cyan)" type="key" height={[1.25, 'rem']} width={[1.25, 'rem']} />
          Change password
        </div>
        <div class="transform-rotate-90">
          <Icon fill="var(--color-cyan)" type="caret" height={[1, 'rem']} width={[1, 'rem']} />
        </div>
      </a>
    </div>
  </nav>
</ResponsivePageWrapper>
