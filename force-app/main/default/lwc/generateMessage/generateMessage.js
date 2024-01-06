import { LightningElement } from "lwc";

export default class GenerateMessage extends LightningElement {
  fname = "";
  lname = "";

  changeHandler(event) {
    let { name, value } = event.target;
    if (name === "fname") {
      this.fname = value;
    } else if (name === "lname") {
      this.lname = value;
    }
  }

  clickHandler() {
    let fullname = `${this.fname} ${this.lname}`.toUpperCase();
    const messageSend = new CustomEvent("message", {
      detail: {
        fullname: fullname
      }
    });
    this.dispatchEvent(messageSend);
  }
}
