import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import UserService from '$lib/Services/UserService';
import type { ProfileType } from '$lib/Types/UserTypes';
import type { ResponsivePageWrapperSettings } from '$lib/Types/Components/ResponsivePageWrapperTypes';

type PageProps = {
  user: ProfileType;
  responsivePageWrapperOpts: ResponsivePageWrapperSettings;
};

export async function load({ fetch }): Promise<PageProps> {
  const userResponse = await UserService.Api.getAuthUser(fetch);

  if (userResponse.ok) {
    const user: ProfileType = await userResponse.json();

    return {
      user,
      responsivePageWrapperOpts: {
        breadcrumbs: { links: [{ url: resolve('/home'), label: 'Home' }], current: 'Profile' },
        footer: {
          links: [
            { label: 'Home', href: resolve('/home'), icon: 'home' },
            { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
            { label: 'Settings', href: resolve('/settings'), icon: 'settings' },
          ],
        },
        header: { title: 'Profile' },
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
