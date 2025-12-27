import { redirect } from '@sveltejs/kit';
import NewsletterService from '$lib/Services/NewsletterService';
import UserService from '$lib/Services/UserService.js';
import type { PublicNewsletterType } from '$lib/Types/NewsletterTypes';
import type { ProfileType } from '$lib/Types/UserTypes.js';

type PageProps = {
  newsletters: PublicNewsletterType[];
  user: ProfileType;
};

export async function load({ params }): Promise<PageProps> {
  const [newslettersResponse, usersResponse] = await Promise.all([
    NewsletterService.Api.getNewslettersByUsername(params.username),
    UserService.Api.getUser(params.username),
  ]);

  let newsletters: PublicNewsletterType[] = [];
  let user: ProfileType;

  if (newslettersResponse.ok) {
    newsletters = await newslettersResponse.json();
  }

  if (usersResponse.ok) {
    user = await usersResponse.json();

    return { newsletters, user };
  } else throw redirect(301, '/');
}
