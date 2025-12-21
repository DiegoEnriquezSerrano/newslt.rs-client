import ApiService from './ApiService';
import type { FetchFn } from '$lib/Types/ApiTypes';

const UserService = {
  Api: {
    async getAuthUser(fetchFn: FetchFn): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/user`;
      const opts = ApiService.requestInit();

      return await fetchFn(url, opts);
    },
  },
};

export default UserService;
