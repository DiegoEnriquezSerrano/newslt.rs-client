import FlashMessageStore from '$lib/Stores/FlashMessageStore';
import type { FlashMessage } from '$lib/Types/FlashMessageTypes';

namespace FlashMessageService {
  export const setMessage = (message: FlashMessage): void => {
    const id = new Date().valueOf();
    const flashMessage: FlashMessage = {
      ...message,
      id,
    };

    FlashMessageStore.update((messages: FlashMessage[]) => [...messages, flashMessage]);

    setTimeout(() => {
      FlashMessageStore.update((messages: FlashMessage[]) => [
        ...messages.filter((m) => m.id != id),
      ]);
    }, 3000);
  };

  export const dismissMessage = (messageId: number): void => {
    FlashMessageStore.update((messages: FlashMessage[]) => [
      ...messages.filter((m) => m.id != messageId),
    ]);
  };
}

export default FlashMessageService;
