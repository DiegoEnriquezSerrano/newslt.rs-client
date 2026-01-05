import ApiService from '$lib/Services/ApiService';

const SubscriptionService = {
  Api: {
    async postSubscribe(body: {
      answer: string;
      email: string;
      name: string;
      signedAnswer: string;
      username: string;
    }): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/subscriptions`;
      const opts = ApiService.requestInit(
        'POST',
        JSON.stringify({
          answer_attempt: body.answer,
          email: body.email,
          name: body.name,
          signed_answer: body.signedAnswer,
          username: body.username,
        }),
      );

      return await fetch(url, opts);
    },

    async putConfirmSubscription(body: { subscriptionToken: string }): Promise<Response> {
      const url = `${import.meta.env.VITE_API_URL}/subscriptions/confirm?subscription_token=${String(body.subscriptionToken)}`;
      const opts = ApiService.requestInit('PUT');

      return await fetch(url, opts);
    },
  },
};

export default SubscriptionService;
