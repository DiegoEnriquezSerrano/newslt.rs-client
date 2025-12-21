import ApiService from './ApiService';
import type { FetchFn } from '$lib/Types/ApiTypes';
import type { UpdateProfileParams } from '$lib/Types/UserTypes';

type ChangePasswordParams = {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
};

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

    async putPassword(params: ChangePasswordParams): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/password`;
      const opts = ApiService.requestInit(
        'PUT',
        JSON.stringify({
          current_password: params.currentPassword,
          new_password: params.newPassword,
          new_password_check: params.newPasswordCheck,
        }),
      );

      return await fetch(url, opts);
    },
  },
};

export default UserService;
