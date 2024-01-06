import { LightningElement } from "lwc";

export default class ConditionalRendering extends LightningElement {
  displaymessage = false;
  changeHandler(event) {
    this.displaymessage = !this.displaymessage;
  }
}
