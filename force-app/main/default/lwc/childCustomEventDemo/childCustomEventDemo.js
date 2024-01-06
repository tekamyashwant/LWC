import { LightningElement } from "lwc";

export default class ChildCustomEventDemo extends LightningElement {
  clickHandler() {
    const cusEve = new CustomEvent("displaymsg");
    this.dispatchEvent(cusEve);
  }
}
