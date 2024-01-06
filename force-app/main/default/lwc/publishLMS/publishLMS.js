import { LightningElement, wire } from "lwc";
import { publish, MessageContext } from "lightning/messageService";
import recordSelected from "@salesforce/messageChannel/sendMessage__c";

export default class PublishLMS extends LightningElement {
  @wire(MessageContext)
  messageContext;
  clickHandler() {
    let payload = {
      lmsData: "Welcome to learn LWC with Tech Journey with Yashwant Tekam"
    };
    publish(this.messageContext, recordSelected, payload);
  }
}
