import HomeIcon from '$lib/Assets/Icons/Home.svg?raw';
import LogoutIcon from '$lib/Assets/Icons/Logout.svg?raw';
import UserIcon from '$lib/Assets/Icons/User.svg?raw';
import UserFillIcon from '$lib/Assets/Icons/UserFill.svg?raw';
import XIcon from '$lib/Assets/Icons/X.svg?raw';
import type { IconTypes } from '$lib/Types/IconTypes';

export const icons: Record<IconTypes, string> = {
  home: HomeIcon,
  logout: LogoutIcon,
  user: UserIcon,
  userFill: UserFillIcon,
  x: XIcon,
};
