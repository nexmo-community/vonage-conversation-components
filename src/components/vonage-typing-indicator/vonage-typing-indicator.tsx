import {Component, Host, h, Prop} from '@stencil/core';

@Component({
  tag: 'vonage-typing-indicator',
  styleUrl: 'vonage-typing-indicator.css',
  shadow: true
})
export class VonageTypingIndicator {
  /**
   * Message to indicate who is typing
   */
  @Prop() message: string;

  render() {
    return (
      <Host>
        <slot></slot>
        <div>{this.message}</div>
      </Host>
    );
  }

}
