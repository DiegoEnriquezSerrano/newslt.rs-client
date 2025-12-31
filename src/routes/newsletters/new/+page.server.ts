import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import AuthenticationService from '$lib/Services/AuthenticationService';
import type { ResponsivePageWrapperSettings } from '$lib/Types/Components/ResponsivePageWrapperTypes';

type PageProps = {
  responsivePageWrapperOpts: ResponsivePageWrapperSettings;
};

export async function load({ fetch }): Promise<PageProps> {
  const authenticationResponse = await AuthenticationService.Api.getAuthenticate(fetch);

  if (authenticationResponse.ok) {
    return {
      responsivePageWrapperOpts: {
        breadcrumbs: {
          links: [
            { url: resolve('/home'), label: 'Home' },
            { url: resolve('/newsletters'), label: 'Newsletters' },
          ],
          current: 'New',
        },
        footer: {
          links: [
            { label: 'Home', href: resolve('/home'), icon: 'home' },
            { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
            { label: 'Settings', href: resolve('/settings'), icon: 'settings' },
          ],
        },
        header: { title: 'Newsletters' },
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
