import type { AssociatedUserType } from './UserTypes';

export type NewsletterType = {
  content: string;
  cover_image_url: string;
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
  coverImage: string | ArrayBuffer | null;
};

export type UpdateNewsletterParams = {
  content: NewsletterType['content'];
  description: NewsletterType['description'];
  title: NewsletterType['title'];
};

export type PublishNewsletterParams = {
  idempotencyKey: string;
};

export type UpdateNewsletterCoverImageParams = {
  image: string | ArrayBuffer | null;
};

export type PublicNewsletterType = {
  content: string;
  description: string;
  published_at: string;
  slug: string;
  title: string;
  user: AssociatedUserType;
};
