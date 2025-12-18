import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch: HandleFetch = async ({ event, request, fetch }) => {
  if (request.url.startsWith(import.meta.env.VITE_API_URL)) {
    const cookie = event.cookies.get(import.meta.env.VITE_SESSION_KEY);

    event.cookies.set(import.meta.env.VITE_SESSION_KEY, String(cookie), {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
    });
  }

  return fetch(request);
};
