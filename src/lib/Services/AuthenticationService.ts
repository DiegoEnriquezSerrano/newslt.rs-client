import ApiService from '$lib/Services/ApiService';
import type { FetchFn } from '$lib/Types/ApiTypes';

namespace AuthenticationService {
  export namespace Api {
    export async function getAuthenticate(fetchFn: FetchFn): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/authenticate`;
      const opts = ApiService.requestInit();

      return await fetchFn(url, opts);
    }

    export async function postLogin(body: { password: string; username: string }): Promise<any> {
      const url = `${import.meta.env.VITE_API_URL}/login`;
      const opts = ApiService.requestInit(
        'POST',
        JSON.stringify({
          password: body.password,
          username: body.username,
        }),
      );

      return await fetch(url, opts);
    }
  }
}

export default AuthenticationService;
