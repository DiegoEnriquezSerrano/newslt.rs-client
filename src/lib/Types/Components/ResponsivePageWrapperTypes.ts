import type Breadcrumbs from '$lib/Components/Breadcrumbs.svelte';
import type NavigationOverlay from '$lib/Components/NavigationOverlay.svelte';
import type ResponsivePageFooter from '$lib/Components/Layouts/ResponsivePageFooter.svelte';
import type ResponsivePageHeader from '$lib/Components/Layouts/ResponsivePageHeader.svelte';
import type { ComponentProps } from 'svelte';

export type ResponsivePageWrapperSettings = {
  breadcrumbs?: ComponentProps<typeof Breadcrumbs>;
  footer: ComponentProps<typeof ResponsivePageFooter>;
  header: ComponentProps<typeof ResponsivePageHeader>;
  navigationOverlay: ComponentProps<typeof NavigationOverlay>;
};
