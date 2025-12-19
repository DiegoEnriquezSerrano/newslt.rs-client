import { redirect } from '@sveltejs/kit';
import AuthenticationService from '$lib/Services/AuthenticationService';

export async function load({ fetch }) {
  const authenticationResponse = await AuthenticationService.Api.getAuthenticate(fetch);

  if (!authenticationResponse.ok) {
    throw redirect(301, '/');
  }
}
