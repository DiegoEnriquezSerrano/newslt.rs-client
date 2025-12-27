import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
  it('should render header', async () => {
    render(Page, { data: { newsletters: [] }, params: {}, form: undefined });

    const heading = page.getByText('Newsletters');

    await expect.element(heading).toBeInTheDocument();
  });
});
