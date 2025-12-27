import NewsletterService from '$lib/Services/NewsletterService';
import type { PublicNewsletterType } from '$lib/Types/NewsletterTypes';

type PageProps = {
  newsletters: PublicNewsletterType[];
};

export async function load(): Promise<PageProps> {
  const newslettersResponse = await NewsletterService.Api.getNewsletters();

  let newsletters: PublicNewsletterType[] = [];

  if (newslettersResponse.ok) {
    newsletters = await newslettersResponse.json();
  }

  return { newsletters };
}
