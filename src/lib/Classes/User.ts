import type { AssociatedUserType } from '$lib/Types/UserTypes';

export class AssociatedUser implements AssociatedUserType {
  avatar_url: string;
  banner_url: string;
  description: string;
  display_name: string;
  username: string;
  // synthetic params
  hasAvatarImage: boolean;
  hasBannerImage: boolean;
  hasDisplayName: boolean;

  constructor(params: AssociatedUserType) {
    this.avatar_url = params.avatar_url;
    this.banner_url = params.banner_url;
    this.description = params.description;
    this.display_name = params.display_name;
    this.username = params.username;
    this.hasAvatarImage = Boolean(params.avatar_url.trim());
    this.hasBannerImage = Boolean(params.banner_url.trim());
    this.hasDisplayName = Boolean(params.display_name.trim());
  }

  static fromParams = (params: AssociatedUserType) => new AssociatedUser(params);
}
