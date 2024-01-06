import { LightningElement } from "lwc";

export default class ParentComposition extends LightningElement {
  fireHandler() {
    console.log("Event Handled on Parent - At Child Level.");
  }

  firedivHandler() {
    console.log("Event Handled on Div Parent - At Child Level.");
  }
}
