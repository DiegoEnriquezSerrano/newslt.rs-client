import { dateStringFromISO, timeStringFromISO } from '$lib/utils';
import { AssociatedUser } from '$lib/Classes/User';
import type { NewsletterType, PublicNewsletterType } from '$lib/Types/NewsletterTypes';

export class Newsletter implements NewsletterType {
  content: string;
  cover_image_url: string;
  description: string;
  html_content: string;
  newsletter_issue_id: `${string}-${string}-${string}-${string}-${string}`;
  published_at: string;
  slug: string;
  title: string;
  user_id: `${string}-${string}-${string}-${string}-${string}`;
  // synthetic params
  isDraft: boolean;
  publishedAtDate: string;
  publishedAtTime: string;

  constructor(params: NewsletterType) {
    this.content = params.content;
    this.cover_image_url = params.cover_image_url;
    this.description = params.description;
    this.html_content = params.html_content;
    this.newsletter_issue_id = params.newsletter_issue_id;
    this.published_at = params.published_at;
    this.user_id = params.user_id;
    this.slug = params.slug;
    this.title = params.title;
    this.isDraft = !params.published_at;
    this.publishedAtDate = dateStringFromISO(params.published_at);
    this.publishedAtTime = timeStringFromISO(params.published_at);
  }

  static fromParams = (params: NewsletterType) => new Newsletter(params);
}

export class PublicNewsletter implements PublicNewsletterType {
  cover_image_url: string;
  description: string;
  content: string;
  published_at: string;
  slug: string;
  title: string;
  user: AssociatedUser;
  // synthetic params
  hasCoverImage: boolean;
  publishedAtDate: string;
  publishedAtTime: string;

  constructor(params: PublicNewsletterType) {
    this.description = params.description;
    this.content = params.content;
    this.cover_image_url = params.cover_image_url;
    this.published_at = params.published_at;
    this.slug = params.slug;
    this.title = params.title;
    this.user = AssociatedUser.fromParams(params.user);
    this.hasCoverImage = Boolean(params.cover_image_url.trim());
    this.publishedAtDate = dateStringFromISO(params.published_at);
    this.publishedAtTime = timeStringFromISO(params.published_at);
  }

  static fromParams = (params: PublicNewsletterType) => new PublicNewsletter(params);
}
