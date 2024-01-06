import { LightningElement } from "lwc";

export default class GrandParentComposition extends LightningElement {
  fireHandler() {
    console.log("Event Handled on Parent - At Child Level.");
  }
}
