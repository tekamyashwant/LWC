import { LightningElement, track } from "lwc";

export default class NestedObjectPrivateProperty extends LightningElement {
  myDetails = { fname: "Yashwant", lname: "Tekam" };
  myTask = ["Office", "Meeting", "BootCamp"];

  clickHandler(event) {
    this.myDetails.fname = "Eshu";
    console.log("fname:", this.myDetails.fname);
  }

  myTaskclickHandler(event) {
    this.myTask.push("Self Study");
  }

  refreshclickHandler(event) {
    this.myDetails = { fname: "Eshu", lname: "Tekam" };
    this.myTask = [...this.myTask, "Hello"];
  }
}
