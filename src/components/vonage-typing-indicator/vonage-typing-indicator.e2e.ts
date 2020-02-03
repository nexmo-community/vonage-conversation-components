import { newE2EPage } from '@stencil/core/testing';

describe('vonage-typing-indicator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-typing-indicator></vonage-typing-indicator>');

    const element = await page.find('vonage-typing-indicator');
    expect(element).toHaveClass('hydrated');
  });

  it('renders when a user is typing', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-typing-indicator></vonage-typing-indicator>');

    const component = await page.find('vonage-typing-indicator');
    const element = await page.find('vonage-typing-indicator >>> div');

    // no one is typing
    expect(element.textContent).toEqual(``);

    // someone is typing
    component.setProperty('message','Jane is typing...');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Jane is typing...`);
  });
});
