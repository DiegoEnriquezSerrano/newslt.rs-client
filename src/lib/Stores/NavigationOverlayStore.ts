import { writable } from 'svelte/store';

const createNavigationOverlayStore = () => {
  const { subscribe, update } = writable<{ open: boolean }>({ open: false });

  function openDrawer(): void {
    update((current) => {
      return {
        ...current,
        open: true,
      };
    });
  }

  function closeDrawer(): void {
    update((current) => {
      return {
        ...current,
        open: false,
      };
    });
  }

  function toggleDrawer(): void {
    update((current) => {
      return {
        ...current,
        open: !current.open,
      };
    });
  }

  return {
    subscribe,
    update,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
};

const NavigationOverlayStore = createNavigationOverlayStore();

export default NavigationOverlayStore;
