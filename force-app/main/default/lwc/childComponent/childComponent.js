import { LightningElement, api } from "lwc";

export default class ChildComponent extends LightningElement {
  @api display;
  @api displayGreeting;
  userValue;
  @api isUserAvailable = false;

  @api
  get user() {
    return this.userValue;
  }

  set user(value) {
    let cloneUser = { ...value };
    this.userValue = cloneUser.channel.toUpperCase();
  }
}
