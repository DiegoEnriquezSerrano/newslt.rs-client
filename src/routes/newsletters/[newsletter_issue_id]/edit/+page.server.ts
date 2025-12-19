import { redirect } from '@sveltejs/kit';
import NewsletterService from '$lib/Services/NewsletterService';
import type { NewsletterType } from '$lib/Types/NewsletterTypes';

export async function load({ fetch, params }) {
  const newsletterResponse = await NewsletterService.Api.getAuthUserNewsletter(
    params.newsletter_issue_id,
    fetch,
  );

  if (newsletterResponse.ok) {
    const newsletter: NewsletterType = await newsletterResponse.json();

    return { newsletter };
  } else if (newsletterResponse.status === 404) {
    throw redirect(301, '/dashboard/newsletters');
  } else {
    throw redirect(301, '/');
  }
}
