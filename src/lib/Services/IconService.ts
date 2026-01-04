import ArticleIcon from '$lib/Assets/Icons/Article.svg?raw';
import CaretIcon from '$lib/Assets/Icons/Caret.svg?raw';
import HomeIcon from '$lib/Assets/Icons/Home.svg?raw';
import KeyIcon from '$lib/Assets/Icons/Key.svg?raw';
import LoginIcon from '$lib/Assets/Icons/Login.svg?raw';
import LogoutIcon from '$lib/Assets/Icons/Logout.svg?raw';
import MenuIcon from '$lib/Assets/Icons/Menu.svg?raw';
import ProfileIcon from '$lib/Assets/Icons/Profile.svg?raw';
import RedoIcon from '$lib/Assets/Icons/Redo.svg?raw';
import SettingsIcon from '$lib/Assets/Icons/Settings.svg?raw';
import UserFillIcon from '$lib/Assets/Icons/UserFill.svg?raw';
import UserIcon from '$lib/Assets/Icons/User.svg?raw';
import XIcon from '$lib/Assets/Icons/X.svg?raw';
import type { IconTypes } from '$lib/Types/IconTypes';

export const icons: Record<IconTypes, string> = {
  article: ArticleIcon,
  caret: CaretIcon,
  home: HomeIcon,
  key: KeyIcon,
  login: LoginIcon,
  logout: LogoutIcon,
  menu: MenuIcon,
  profile: ProfileIcon,
  redo: RedoIcon,
  settings: SettingsIcon,
  user: UserIcon,
  userFill: UserFillIcon,
  x: XIcon,
};
