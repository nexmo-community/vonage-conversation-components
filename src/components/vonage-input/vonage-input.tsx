import { Component, Host, h, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'vonage-input',
  styleUrl: 'vonage-input.css',
  shadow: true
})

export class VonageInput {

  textInput!: HTMLInputElement;

  @Event({
    eventName: 'textEntered',
    composed: true,
    cancelable: true,
    bubbles: true,
  }) textEntered: EventEmitter;

  handleSubmit = (ev: Event) => {
    ev.preventDefault();
    this.textEntered.emit(this.textInput.value);
  };

  render() {
    return (
      <Host>
        <slot></slot>
        <br/>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" ref={(el) => this.textInput = el as HTMLInputElement}/>
          </label>
          <button type="submit">Login</button>
        </form>
      </Host>
    );
  }

}
