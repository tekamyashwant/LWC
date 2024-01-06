import { LightningElement, wire } from "lwc";
import getContactList from "@salesforce/apex/contactController.getContactList";
import { publish, MessageContext } from "lightning/messageService";
import recordSelected from "@salesforce/messageChannel/sendContact__c";

export default class ContactList extends LightningElement {
  @wire(MessageContext)
  messageContext;
  @wire(getContactList) contactRecords;
  selectedContactNew;

  selectionHandler(event) {
    let selectedContactId = event.detail;
    this.selectedContactNew = this.contactRecords.data.find(
      (currItem) => currItem.Id === selectedContactId
    );
    console.log("Selected Contact Id:", this.selectedContactNew);
    const payload = { lmsDataList: this.selectedContactNew };

    publish(this.messageContext, recordSelected, payload);
  }
}
