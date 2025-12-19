import ApiService from '$lib/Services/ApiService';
import type { FetchFn } from '$lib/Types/ApiTypes';
import type {
  CreateNewsletterParams,
  NewsletterType,
  PublishNewsletterParams,
  UpdateNewsletterParams,
} from '$lib/Types/NewsletterTypes';

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

    async getAuthUserDraftNewsletters(fetchFn: FetchFn): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/newsletters/drafts`;
      const opts = ApiService.requestInit();

      return await fetchFn(url, opts);
    },

    async getAuthUserNewsletter(newsletter_issue_id: string, fetchFn: FetchFn): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/newsletters/${newsletter_issue_id}`;
      const opts = ApiService.requestInit();

      return await fetchFn(url, opts);
    },

    async postNewsletter(params: CreateNewsletterParams): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/newsletters`;
      const opts = ApiService.requestInit(
        'POST',
        JSON.stringify({
          content: params.content,
          description: params.description,
          title: params.title,
        }),
      );

      return fetch(url, opts);
    },

    async putNewsletter(
      newsletter_issue_id: NewsletterType['newsletter_issue_id'],
      params: UpdateNewsletterParams,
    ): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/newsletters/${newsletter_issue_id}`;
      const opts = ApiService.requestInit('PUT', JSON.stringify(params));

      return fetch(url, opts);
    },

    async putPublishNewsletter(
      newsletter_issue_id: NewsletterType['newsletter_issue_id'],
      params: PublishNewsletterParams,
    ): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/admin/newsletter/${newsletter_issue_id}/publish`;
      const opts = ApiService.requestInit(
        'PUT',
        JSON.stringify({
          idempotency_key: params.idempotencyKey,
        }),
      );

      return fetch(url, opts);
    },
  },
};

export default NewsletterService;
