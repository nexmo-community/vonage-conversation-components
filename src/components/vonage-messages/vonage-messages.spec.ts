import { newSpecPage } from '@stencil/core/testing';
import { VonageMessages } from './vonage-messages';

const sender = {
  user:{
    "id": "USR-4b332094-0e5a-41da-b027-b8bb0914d9f2",
    "name": "bob"
  }
};
const message = {
  from: "MEM-bc393927-94d1-440b-8c32-355dc04555a0",
  body: {
    text: "Test Message",
  },
  timestamp: "2020-02-03T16:35:48.598Z"
};
const me = {
  id: "MEM-bc393927-94d1-440b-8c32-355dc04555a0"
};
const notMe = {
  id: "MEM-8f312f87-5120-46b3-a9a4-b0f6dbdd2362"
};

describe('vonage-messages', () => {
  it('builds', () => {
    expect(new VonageMessages()).toBeTruthy();
  });
  describe('message is displayed', () => {
    it ('there are no messages', async () => {
      const page = await newSpecPage({
        components: [VonageMessages],
        html: `<vonage-messages></vonage-messages>`,
      });
      expect(page.root).toEqualHtml(`
        <vonage-messages>
            <mock:shadow-root>
                <slot></slot>
                <br>
            </mock:shadow-root>
        </vonage-messages>
      `);
    });
    it ('message is from sender', async () => {
      const component = new VonageMessages();
      await component.addMessage(sender,message,me);
      expect (component.messagesArray).toEqual(['me (Monday, February 3, 2020, 11:35 AM): <b>Test Message</b>'])
    });
    it ('message is not from sender', async () => {
      const component = new VonageMessages();
      await component.addMessage(sender,message,notMe);
      expect (component.messagesArray).toEqual(['<span style="color:red">bob <span style="color:red;">(Monday, February 3, 2020, 11:35 AM): <b>Test Message</b></span>'])
    });
  })
});
