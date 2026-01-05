import SubscriptionService from '$lib/Services/SubscriptionService';

type PageProps = {
  ok: boolean;
};

export async function load({ url }): Promise<PageProps> {
  const subscriptionToken = String(url.searchParams.get('subscription_token'));
  const subscriptionConfirmationResponse = await SubscriptionService.Api.putConfirmSubscription({
    subscriptionToken,
  });

  return { ok: subscriptionConfirmationResponse.ok };
}
