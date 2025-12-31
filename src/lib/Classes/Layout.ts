import { resolve } from '$app/paths';
import type { ResolvedPathname } from '$app/types';
import type ResponsivePageFooter from '$lib/Components/Layouts/ResponsivePageFooter.svelte';
import type NavigationOverlay from '$lib/Components/NavigationOverlay.svelte';
import type { ComponentProps } from 'svelte';

class Layout {
  isAuthenticated: boolean;

  constructor(isAuthenticated: boolean) {
    this.isAuthenticated = isAuthenticated;
  }

  get layoutOptions(): {
    footer: ComponentProps<typeof ResponsivePageFooter>;
    navigationOverlay: ComponentProps<typeof NavigationOverlay>;
  } {
    if (this.isAuthenticated) {
      return {
        footer: {
          links: [
            { label: 'Home', href: resolve('/home'), icon: 'home' },
            { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
            { label: 'Settings', href: resolve('/settings'), icon: 'settings' },
          ],
        },
        navigationOverlay: {
          links: [
            { label: 'Home', href: resolve('/home'), icon: 'home' },
            { label: 'Newsletters', href: resolve('/newsletters'), icon: 'article' },
            { label: 'Profile', href: resolve('/profile'), icon: 'profile' },
            { label: 'Settings', href: resolve('/settings'), icon: 'settings' },
          ],
          isAuthenticated: this.isAuthenticated,
        },
      };
    } else {
      return {
        footer: {
          links: [
            { label: 'Home', href: resolve('/'), icon: 'home' },
            { label: 'Login', href: resolve('/login'), icon: 'login' },
          ],
        },
        navigationOverlay: {
          links: [{ label: 'Home', href: resolve('/'), icon: 'home' }],
          isAuthenticated: this.isAuthenticated,
        },
      };
    }
  }

  get home(): { label: string; url: ResolvedPathname } {
    if (this.isAuthenticated)
      return {
        label: 'Home',
        url: resolve('/home'),
      };
    else return { label: 'Home', url: resolve('/') };
  }

  static init(isAuthenticated: boolean): Layout {
    return new Layout(isAuthenticated);
  }
}

export default Layout;
