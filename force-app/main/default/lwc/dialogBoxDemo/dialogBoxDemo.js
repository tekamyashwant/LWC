import { LightningElement } from "lwc";
import LightningAlert from "lightning/alert";
import LightningConfirm from "lightning/confirm";
import LightningPrompt from "lightning/prompt";

export default class DialogBoxDemo extends LightningElement {
  async alertHandler() {
    await LightningAlert.open({
      message: "this is the alert message",
      theme: "error", // a red theme intended for error states
      label: "Error!" // this is the header text
    });
    //Alert has been closed
  }
  async confirmHandler() {
    const result = await LightningConfirm.open({
      message: "this is the prompt message",
      variant: "header",
      label: "this is the aria-label value",
      theme: "inverse"
      // setting theme would have no effect
    });
    console.log("result", result);
    //Confirm has been closed
    //result is true if OK was clicked
    //and false if cancel was clicked
  }
  promptHandler() {
    LightningPrompt.open({
      message: "this is the prompt message",
      //theme defaults to "default"
      theme: "warning",
      label: "Please Respond", // this is the header text
      defaultValue: "Welcome to learn LWC by Yashwant" //this is optional
    }).then((result) => {
      console.log(result);
      //Prompt has been closed
      //result is input text if OK clicked
      //and null if cancel was clicked
    });
  }
}
