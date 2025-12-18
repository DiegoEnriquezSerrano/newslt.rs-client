import { redirect } from '@sveltejs/kit';
import AuthenticationService from '$lib/Services/AuthenticationService';

export async function load({ fetch }) {
  const userResponse = await AuthenticationService.Api.getAuthenticate(fetch);

  if (!userResponse.ok) {
    throw redirect(301, '/');
  }
}
