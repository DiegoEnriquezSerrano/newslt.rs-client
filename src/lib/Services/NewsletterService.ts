import ApiService from '$lib/Services/ApiService';

namespace NewsletterService {
  export function getPublicNewslettersRequestInit() {
    const url = `${import.meta.env.VITE_API_URL}/newsletters`;
    const opts = ApiService.requestInit();

    return { url, opts };
  }
}

export default NewsletterService;
