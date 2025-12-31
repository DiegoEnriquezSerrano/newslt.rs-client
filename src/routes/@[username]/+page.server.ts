// dependencies
import { redirect } from '@sveltejs/kit';
// classes
import LayoutService from '$lib/Classes/Layout.js';
// services
import AuthenticationService from '$lib/Services/AuthenticationService.js';
import NewsletterService from '$lib/Services/NewsletterService';
import UserService from '$lib/Services/UserService.js';
// types
import type { ProfileType } from '$lib/Types/UserTypes.js';
import type { PublicNewsletterType } from '$lib/Types/NewsletterTypes';
import type { ResponsivePageWrapperSettings } from '$lib/Types/Components/ResponsivePageWrapperTypes';

type PageProps = {
  breadcrumbs: ResponsivePageWrapperSettings['breadcrumbs'];
  footer: ResponsivePageWrapperSettings['footer'];
  header: ResponsivePageWrapperSettings['header'];
  navigationOverlay: ResponsivePageWrapperSettings['navigationOverlay'];
  newsletters: PublicNewsletterType[];
  user: ProfileType;
};

export async function load({ params, fetch }): Promise<PageProps> {
  const [authenticatedResponse, newslettersResponse, usersResponse] = await Promise.all([
    AuthenticationService.Api.getAuthenticate(fetch),
    NewsletterService.Api.getNewslettersByUsername(params.username),
    UserService.Api.getUser(params.username),
  ]);

  const layoutService = LayoutService.init(authenticatedResponse.ok);

  let newsletters: PublicNewsletterType[] = [];
  let user: ProfileType;

  if (newslettersResponse.ok) {
    newsletters = await newslettersResponse.json();
  }

  if (usersResponse.ok) {
    user = await usersResponse.json();

    const { footer, navigationOverlay } = layoutService.layoutOptions;
    const home = layoutService.home;

    return {
      breadcrumbs: {
        links: [home],
        current: params.username,
      },
      footer,
      header: {
        title: params.username,
      },
      navigationOverlay,
      newsletters,
      user,
    };
  } else throw redirect(301, '/');
}
