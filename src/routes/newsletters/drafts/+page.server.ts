import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import NewsletterService from '$lib/Services/NewsletterService';
import type { NewsletterType } from '$lib/Types/NewsletterTypes';
import type { ResponsivePageWrapperSettings } from '$lib/Types/Components/ResponsivePageWrapperTypes';

type PageProps = {
  newsletters: NewsletterType[];
  responsivePageWrapperOpts: ResponsivePageWrapperSettings;
};

export async function load({ fetch }): Promise<PageProps> {
  const newslettersResponse = await NewsletterService.Api.getAuthUserDraftNewsletters(fetch);

  if (newslettersResponse.ok) {
    const newsletters: NewsletterType[] = await newslettersResponse.json();

    return {
      newsletters,
      responsivePageWrapperOpts: {
        breadcrumbs: {
          links: [
            { url: resolve('/home'), label: 'Home' },
            { url: resolve('/newsletters'), label: 'Newsletters' },
          ],
          current: 'Drafts',
        },
        footer: {
          links: [
            { label: 'Home', href: resolve('/home'), icon: 'home' },
            { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
            { label: 'Settings', href: resolve('/settings'), icon: 'settings' },
          ],
        },
        header: { title: 'Drafts' },
        navigationOverlay: {
          links: [
            { label: 'Home', href: resolve('/home'), icon: 'home' },
            { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
            { label: 'Profile', href: resolve('/profile'), icon: 'profile' },
            { label: 'Settings', href: resolve('/settings'), icon: 'settings' },
          ],
          isAuthenticated: true,
        },
      },
    };
  } else {
    throw redirect(301, '/');
  }
}
