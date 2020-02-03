import { Component, Prop, Host, h } from '@stencil/core';

@Component({
  tag: 'vonage-users',
  styleUrl: 'vonage-users.css',
  shadow: true
})
export class VonageUsers {
  /**
   * Array of current users
   */
  @Prop() users : Array<Object> = [];

  render() {
    return (
      <Host>
        <slot></slot>
        <div>
        {this.users.map((user) =>
          <div key={user['id']}>
            {user['name']}
          </div>
        )}
        </div>
      </Host>
    );
  }

}
