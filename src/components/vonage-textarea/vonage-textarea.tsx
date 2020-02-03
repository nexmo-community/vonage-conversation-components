import { Component, Host, h, Event, EventEmitter, Listen } from '@stencil/core';

@Component({
  tag: 'vonage-textarea',
  styleUrl: 'vonage-textarea.css',
  shadow: true
})

export class VonageTextArea {

  textAreaInput!: HTMLTextAreaElement;

  @Event({
    eventName: 'messageEntered',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) messageEntered: EventEmitter;

  messageEnteredHandler() {
    this.messageEntered.emit(this.textAreaInput.value);
    this.textAreaInput.value='';
  };

  @Event({
    eventName: 'startTyping',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) startTyping: EventEmitter;

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent){
    // console.log('down arrow pressed',ev);
    this.startTyping.emit(ev);
  };

  timeout = null;

  @Event({
    eventName: 'stopTyping',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) stopTyping: EventEmitter;

  @Listen('keyup')
  handleKeyUp(ev: KeyboardEvent){
    // console.log('down arrow pressed',ev);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.stopTyping.emit(ev);
    }, 500);
  };


  render() {
    return (
      <Host>
        <slot></slot>
        <br/>
        <textarea ref={(el) => this.textAreaInput = el as HTMLTextAreaElement}></textarea>
        <button onClick={() => this.messageEnteredHandler()}>Submit</button>
      </Host>
    );
  }

}
