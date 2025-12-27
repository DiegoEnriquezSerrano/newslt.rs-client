export type AssociatedUserType = {
  avatar_url: string;
  banner_url: string;
  description: string;
  display_name: string;
  username: string;
};

export type ProfileType = {
  avatar_url: string;
  banner_url: string;
  bio: string;
  bio_html: string;
  description: string;
  display_name: string;
  username: string;
  total_issues: number;
};

export type UpdateProfileParams = {
  bio: string;
  description: string;
  displayName: string;
};

export type ChangePasswordParams = {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
};

export type UpdateProfileAvatarParams = {
  avatarUrl: string;
};

export type UpdateProfileBannerParams = {
  bannerUrl: string;
};
