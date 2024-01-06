import { LightningElement, api } from "lwc";

export default class ChildLwcComponent extends LightningElement {
  @api name;

  @api showMessage(greeting) {
    alert(greeting.toUpperCase());
  }
}
