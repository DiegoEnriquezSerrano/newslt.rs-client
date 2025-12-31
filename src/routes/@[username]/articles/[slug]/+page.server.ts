// dependenies
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
// services
import AuthenticationService from '$lib/Services/AuthenticationService';
import LayoutService from '$lib/Classes/Layout';
import NewsletterService from '$lib/Services/NewsletterService';
// types
import type { PublicNewsletterType } from '$lib/Types/NewsletterTypes';
import type { ResponsivePageWrapperSettings } from '$lib/Types/Components/ResponsivePageWrapperTypes';
import type { ProfileType } from '$lib/Types/UserTypes';

type PageProps = {
  breadcrumbs: ResponsivePageWrapperSettings['breadcrumbs'];
  footer: ResponsivePageWrapperSettings['footer'];
  header: ResponsivePageWrapperSettings['header'];
  navigationOverlay: ResponsivePageWrapperSettings['navigationOverlay'];
  newsletter: PublicNewsletterType;
  slug: PublicNewsletterType['slug'];
  username: ProfileType['username'];
};

export async function load({ params, fetch }): Promise<PageProps> {
  const [authenticatedResponse, newslettersResponse] = await Promise.all([
    AuthenticationService.Api.getAuthenticate(fetch),
    NewsletterService.Api.getNewsletter(params.username, params.slug),
  ]);

  const layoutService = LayoutService.init(authenticatedResponse.ok);

  if (newslettersResponse.ok) {
    const newsletter: PublicNewsletterType = await newslettersResponse.json();
    const { footer, navigationOverlay } = layoutService.layoutOptions;
    const home = layoutService.home;

    return {
      breadcrumbs: {
        links: [
          home,
          {
            url: resolve('/@[username]', { username: newsletter.user.username }),
            label: newsletter.user.username,
          },
        ],
        current: newsletter.slug,
      },
      footer,
      header: {
        title: newsletter.slug,
      },
      navigationOverlay,
      newsletter,
      slug: params.slug,
      username: params.username,
    };
  } else {
    redirect(304, '/');
  }
}
