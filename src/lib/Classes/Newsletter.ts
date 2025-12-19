import { dateStringFromISO, timeStringFromISO } from '$lib/utils';
import type { NewsletterType, PublicNewsletterType } from '$lib/Types/NewsletterTypes';

export class Newsletter implements NewsletterType {
  content: string;
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
  description: string;
  content: string;
  published_at: string;
  slug: string;
  title: string;
  // synthetic params
  publishedAtDate: string;
  publishedAtTime: string;

  constructor(params: PublicNewsletterType) {
    this.description = params.description;
    this.content = params.content;
    this.published_at = params.published_at;
    this.slug = params.slug;
    this.title = params.title;
    this.publishedAtDate = dateStringFromISO(params.published_at);
    this.publishedAtTime = timeStringFromISO(params.published_at);
  }

  static fromParams = (params: PublicNewsletterType) => new PublicNewsletter(params);
}
