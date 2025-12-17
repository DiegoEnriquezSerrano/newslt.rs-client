import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type { FlashMessage } from '$lib/Types/FlashMessageTypes';

const FlashMessageStore = writable([]) as Writable<FlashMessage[]>;

export default FlashMessageStore;
