import { Component, Host, h, Prop, Method } from '@stencil/core';

@Component({
  tag: 'vonage-messages',
  styleUrl: 'vonage-messages.css',
  shadow: true
})
export class VonageMessages {
  /**
   * The list of messages
   */
  @Prop() messagesArray: Array<string> = [];

  /**
   * Add message to the list of messages
   */
  @Method()
  async addMessage(sender, message, me) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    const rawDate = new Date(Date.parse(message.timestamp));
    const formattedDate = rawDate.toLocaleDateString('en-US', options);
    let newMessage = '';
    console.log('addMessage sender: ', sender);
    if (message.from !== me.id) {
      // newMessage = `<span style="color:red">${sender ? sender.user.name : 'deleted user'} <span style="color:red;">(${formattedDate}): <b>${message.body.text}</b></span>`;
      newMessage = `<span style="color:red">${sender.user.name} <span style="color:red;">(${formattedDate}): <b>${message.body.text}</b></span>`;
    } else {
      newMessage = `me (${formattedDate}): <b>${message.body.text}</b>`;
    }
    this.messagesArray = [...this.messagesArray, newMessage];
  }

  render() {
    return (
      <Host>
        <slot></slot>
        <br/>
        {this.messagesArray.map((messageData) =>
            <div innerHTML={messageData}></div>
        )}
      </Host>
    );
  }

}
