import { LightningElement, api } from "lwc";

export default class OutputLwcFromFlow extends LightningElement {
  @api inputName;
  changeHandler(event) {
    this.inputName = event.target.value;
  }
}
