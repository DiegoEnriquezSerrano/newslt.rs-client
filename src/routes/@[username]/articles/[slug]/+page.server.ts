import { redirect } from '@sveltejs/kit';
import NewsletterService from '$lib/Services/NewsletterService';
import type { PublicNewsletterType } from '$lib/Types/NewsletterTypes';

type PageProps = {
  newsletter: PublicNewsletterType;
  slug: string;
  username: string;
};

export async function load({ params }): Promise<PageProps> {
  const newslettersResponse = await NewsletterService.Api.getNewsletter(
    params.username,
    params.slug,
  );

  let newsletter: PublicNewsletterType;

  if (newslettersResponse.ok) {
    newsletter = await newslettersResponse.json();

    return { newsletter, username: params.username, slug: params.slug };
  } else {
    redirect(304, '/');
  }
}
