import ApiService from '$lib/Services/ApiService';
import type { FetchFn } from '$lib/Types/ApiTypes';

const NewsletterService = {
  Api: {
    async getNewsletters(): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/newsletters`;
      const opts = ApiService.requestInit();

      return await fetch(url, opts);
    },

    async getAuthUserNewsletters(fetchFn: FetchFn): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/newsletters`;
      const opts = ApiService.requestInit();

      return await fetchFn(url, opts);
    },
  },
};

export default NewsletterService;
