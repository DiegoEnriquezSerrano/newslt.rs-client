import { redirect } from '@sveltejs/kit';
import UserService from '$lib/Services/UserService';

export async function load({ fetch }) {
  const authenticationResponse = await UserService.Api.getAuthUser(fetch);

  if (!authenticationResponse.ok) {
    throw redirect(301, '/');
  } else {
    const user = await authenticationResponse.json();

    return { user };
  }
}
