import { newE2EPage } from '@stencil/core/testing';

describe('vonage-messages', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-messages></vonage-messages>');

    const element = await page.find('vonage-messages');
    expect(element).toHaveClass('hydrated');
  });
});
