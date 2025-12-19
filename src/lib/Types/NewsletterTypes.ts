export type NewsletterType = {
  content: string;
  description: string;
  html_content: string;
  newsletter_issue_id: `${string}-${string}-${string}-${string}-${string}`;
  published_at: string;
  slug: string;
  title: string;
  user_id: `${string}-${string}-${string}-${string}-${string}`;
};

export type CreateNewsletterParams = {
  content: NewsletterType['content'];
  description: NewsletterType['description'];
  title: NewsletterType['title'];
};

export type UpdateNewsletterParams = {
  content: NewsletterType['content'];
  description: NewsletterType['description'];
  title: NewsletterType['title'];
};

export type PublishNewsletterParams = {
  idempotencyKey: string;
};

export type PublicNewsletterType = {
  content: string;
  description: string;
  published_at: string;
  slug: string;
  title: string;
};
