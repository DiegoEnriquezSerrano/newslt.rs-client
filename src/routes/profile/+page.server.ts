import { redirect } from '@sveltejs/kit';
import UserService from '$lib/Services/UserService';
import type { ProfileType } from '$lib/Types/UserTypes';

export async function load({ fetch }) {
  const userResponse = await UserService.Api.getAuthUser(fetch);

  if (userResponse.ok) {
    const user: ProfileType = await userResponse.json();

    return { user };
  } else {
    throw redirect(301, '/');
  }
}
