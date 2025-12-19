import { redirect } from '@sveltejs/kit';
import NewsletterService from '$lib/Services/NewsletterService';
import type { NewsletterType } from '$lib/Types/NewsletterTypes';

export async function load({ fetch }) {
  const newslettersResponse = await NewsletterService.Api.getAuthUserNewsletters(fetch);

  if (newslettersResponse.ok) {
    const newsletters: NewsletterType[] = await newslettersResponse.json();

    return { newsletters };
  } else {
    throw redirect(301, '/');
  }
}
