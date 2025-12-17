import { writable } from 'svelte/store';

const viewWidth = writable(0);
const viewHeight = writable(0);

export { viewWidth, viewHeight };
