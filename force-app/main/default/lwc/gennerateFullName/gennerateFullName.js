import { LightningElement } from "lwc";

export default class GennerateFullName extends LightningElement {
  firstname = "";
  lastname = "";
  fullname = "";
  changeHandler(event) {
    let name = event.target.name;
    if (name === "firstname") {
      this.firstname = event.target.value;
    } else if (name === "lastname") {
      this.lastname = event.target.value;
    }
  }
  clickHandler() {
    this.fullname = `${this.firstname.toUpperCase()} ${this.lastname.toUpperCase()}`;
    console.log("fullname", this.fullname);
  }
}
