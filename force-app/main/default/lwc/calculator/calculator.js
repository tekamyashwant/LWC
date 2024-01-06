import { LightningElement } from "lwc";

export default class Calculator extends LightningElement {
  numberone = "";
  numbertwo = "";
  result = 0;
  displayoutput = false;

  changeHandler(event) {
    let { name, value } = event.target;
    if (name === "Number1") {
      this.numberone = value;
      this.displayoutput = false;
    } else if (name === "Number2") {
      this.numbertwo = value;
      this.displayoutput = false;
    }
  }

  clickHandler(event) {
    this.displayoutput = true;
    let labelElement = event.target.label;
    if (labelElement === "Add") {
      this.result = parseInt(this.numberone) + parseInt(this.numbertwo);
    } else if (labelElement === "Sub") {
      this.result = parseInt(this.numberone) - parseInt(this.numbertwo);
    } else if (labelElement === "Mul") {
      this.result = parseInt(this.numberone) * parseInt(this.numbertwo);
    } else if (labelElement === "Div") {
      this.result = parseInt(this.numberone) / parseInt(this.numbertwo);
    }
    this.numberone = "";
    this.numbertwo = "";
  }
}
