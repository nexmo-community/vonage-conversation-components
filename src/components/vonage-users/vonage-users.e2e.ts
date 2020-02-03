import { newE2EPage } from '@stencil/core/testing';
const users = [
  {id: "USR-0d91f945-070c-4e02-8fe7-b12e9169be73", name: "jane"},
  {id: "USR-4b332094-0e5a-41da-b027-b8bb0914d9f2", name: "bob"}
];

describe('vonage-users', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-users></vonage-users>');

    const element = await page.find('vonage-users');
    expect(element).toHaveClass('hydrated');
  });

  it ('displays users', async () => {
    const page = await newE2EPage();
    await page.setContent('<vonage-users></vonage-users>');
    const component = await page.find('vonage-users');
    const element = await page.find('vonage-users >>> div');

    component.setProperty('users',users);
    await page.waitForChanges();
    expect(element.innerHTML).toEqual(`<div>jane</div><div>bob</div>`);

  })
});
