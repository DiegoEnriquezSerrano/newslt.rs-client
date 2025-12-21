export type AssociatedUserType = {
  description: string;
  dispay_name: string;
  username: string;
};

export type ProfileType = {
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
