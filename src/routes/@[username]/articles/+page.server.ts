import { resolve } from '$app/paths';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
  redirect(308, resolve(`/@[username]`, { username: params.username }));
}
