import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import NewsletterService from '$lib/Services/NewsletterService';
import type { NewsletterType } from '$lib/Types/NewsletterTypes';
import type { ResolvedPathname } from '$app/types';
import type { ResponsivePageWrapperSettings } from '$lib/Types/Components/ResponsivePageWrapperTypes';

type PageProps = {
  newsletter: NewsletterType;
  responsivePageWrapperOpts: ResponsivePageWrapperSettings;
};

export async function load({ fetch, params }): Promise<PageProps> {
  const newsletterResponse = await NewsletterService.Api.getAuthUserNewsletter(
    params.newsletter_issue_id,
    fetch,
  );

  if (newsletterResponse.ok) {
    const newsletter: NewsletterType = await newsletterResponse.json();
    const links: { url: ResolvedPathname; label: string }[] = [
      { url: resolve('/home'), label: 'Home' },
      { url: resolve('/newsletters'), label: 'Newsletters' },
    ];

    if (!newsletter.published_at) {
      links.push({ url: resolve('/newsletters/drafts'), label: 'Drafts' });
    }

    links.push({
      url: resolve(`/newsletters/${newsletter.newsletter_issue_id}`),
      label: newsletter.slug,
    });

    return {
      newsletter,
      responsivePageWrapperOpts: {
        breadcrumbs: {
          links,
          current: 'Edit',
        },
        footer: {
          links: [
            { label: 'Home', href: resolve('/home'), icon: 'home' },
            { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
            { label: 'Settings', href: resolve('/settings'), icon: 'settings' },
          ],
        },
        header: { title: newsletter.slug },
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
  } else if (newsletterResponse.status === 404) {
    throw redirect(301, '/newsletters');
  } else {
    throw redirect(301, '/');
  }
}
