import NewsletterService from '$lib/Services/NewsletterService';
import type { PublicNewsletterType } from '$lib/Types/NewsletterTypes';

export async function load() {
  const newslettersResponse = await NewsletterService.Api.getNewsletters();

  let newsletters: PublicNewsletterType[] = await newslettersResponse.json();

  return { newsletters };
}
