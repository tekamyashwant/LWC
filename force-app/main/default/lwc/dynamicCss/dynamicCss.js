import { LightningElement } from "lwc";

export default class DynamicCss extends LightningElement {
  pcolor = "chocolate-pcolor";

  clickHandler(event) {
    let buttonname = event.target.name;
    let element = this.template.querySelector("p");
    if (buttonname === "addcss") {
      element.classList.add("green-border");
    } else if (buttonname === "removecss") {
      element.classList.remove("green-border");
    } else if (buttonname === "togglecss") {
      element.classList.toggle("green-border");
    }
  }
}
