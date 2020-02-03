import { newE2EPage } from '@stencil/core/testing';

describe('vonage-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-textarea></vonage-textarea>');

    const element = await page.find('vonage-textarea');
    expect(element).toHaveClass('hydrated');
  });

  it('registers messageEntered Event', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-textarea></vonage-textarea>');
    const textarea = await page.find('vonage-textarea >>> textarea');
    const button = await page.find('vonage-textarea >>> button');
    const messageEntered = await page.spyOnEvent('messageEntered');
    await textarea.press('t');
    await textarea.press('e');
    await textarea.press('s');
    await textarea.press('t');
    await button.click();
    await page.waitForChanges();
    expect(messageEntered).toHaveReceivedEventDetail('test');
    let value = await textarea.getProperty('value');
    expect(value).toBe('');
  });

  it('registers startTyping Event', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-textarea></vonage-textarea>');
    const textarea = await page.find('vonage-textarea >>> textarea');
    const startTyping = await page.spyOnEvent('startTyping');
    await textarea.press('t');
    await textarea.press('e');
    await textarea.press('s');
    await textarea.press('t');
    await page.waitForChanges();
    expect(startTyping).toHaveReceivedEvent();
  });

  it('registers stopTyping Event', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-textarea></vonage-textarea>');
    const textarea = await page.find('vonage-textarea >>> textarea');
    const stopTyping = await page.spyOnEvent('stopTyping');
    await textarea.press('t');
    await textarea.press('e');
    await textarea.press('s');
    await textarea.press('t');
    await page.waitForChanges();
    await page.waitFor(500);
    expect(stopTyping).toHaveReceivedEvent();
  });

});
