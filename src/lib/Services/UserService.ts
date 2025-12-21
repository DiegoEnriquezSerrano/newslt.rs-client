import ApiService from './ApiService';
import type { FetchFn } from '$lib/Types/ApiTypes';
import type { UpdateProfileParams } from '$lib/Types/UserTypes';

const UserService = {
  Api: {
    async getAuthUser(fetchFn: FetchFn): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/user`;
      const opts = ApiService.requestInit();

      return await fetchFn(url, opts);
    },

    async putAuthUpdateProfile(params: UpdateProfileParams): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/user`;
      const opts = ApiService.requestInit(
        'PUT',
        JSON.stringify({
          display_name: params.displayName,
          description: params.description,
          bio: params.bio,
        }),
      );

      return await fetch(url, opts);
    },
  },
};

export default UserService;
