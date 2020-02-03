import { newE2EPage } from '@stencil/core/testing';

describe('vonage-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-input></vonage-input>');
    const element = await page.find('vonage-input');
    expect(element).toHaveClass('hydrated');
  });

  it('renders empty value', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-input></vonage-input>');
    const input = await page.find('vonage-input >>> input');
    let value = await input.getProperty('value');
    expect(value).toBe('');
  });

  it('renders test value', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-input></vonage-input>');
    const input = await page.find('vonage-input >>> input');
    const button = await page.find('vonage-input >>> button');
    await input.press('t');
    await input.press('e');
    await input.press('s');
    await input.press('t');
    await button.click();
    await page.waitForChanges();
    let value = await input.getProperty('value');
    expect(value).toBe('test');
  });

  it('registers textEntered Event', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-input></vonage-input>');
    const input = await page.find('vonage-input >>> input');
    const button = await page.find('vonage-input >>> button');
    const textEntered = await page.spyOnEvent('textEntered');
    await input.press('t');
    await input.press('e');
    await input.press('s');
    await input.press('t');
    await button.click();
    await page.waitForChanges();
    expect(textEntered).toHaveReceivedEventDetail('test');
  });

});
