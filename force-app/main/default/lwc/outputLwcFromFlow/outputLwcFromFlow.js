import { LightningElement, api } from "lwc";
import { FlowAttributeChangeEvent } from "lightning/flowSupport";

export default class OutputLwcFromFlow extends LightningElement {
  @api inputName = "";
  changeHandler(event) {
    this.inputName = event.target.value;
    const attributeChangeEvent = new FlowAttributeChangeEvent(
      "inputName",
      this.inputName
    );

    this.dispatchEvent(attributeChangeEvent);
  }
}
