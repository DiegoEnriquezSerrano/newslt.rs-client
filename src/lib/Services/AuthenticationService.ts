import { redirect } from '@sveltejs/kit';
import { goto } from '$app/navigation';
import { resolve } from '$app/paths';
import ApiService from '$lib/Services/ApiService';
import type { FetchFn } from '$lib/Types/ApiTypes';

const AuthenticationService = {
  Api: {
    async getAuthenticate(fetchFn: FetchFn): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/authenticate`;
      const opts = ApiService.requestInit();

      return await fetchFn(url, opts);
    },

    async postLogin(body: { password: string; username: string }): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/login`;
      const opts = ApiService.requestInit(
        'POST',
        JSON.stringify({
          password: body.password,
          username: body.username,
        }),
      );

      return await fetch(url, opts);
    },

    async postLogout(): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/logout`;
      const opts = ApiService.requestInit('POST');

      return await fetch(url, opts);
    },
  },

  async onLogout(): Promise<void> {
    const response = await AuthenticationService.Api.postLogout();

    if (response.ok) goto(resolve('/'));
    else throw redirect(301, resolve('/'));
  },
};

export default AuthenticationService;
