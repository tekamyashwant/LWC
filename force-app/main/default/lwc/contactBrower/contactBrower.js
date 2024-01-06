import { LightningElement, wire } from "lwc";
import getContactRecordslist from "@salesforce/apex/ContactBrowserController.getContactRecordslist";

export default class ContactBrower extends LightningElement {
  selectedAccountId;
  selecetdIndustry;

  @wire(getContactRecordslist, {
    accountId: "$selectedAccountId",
    industry: "$selecetdIndustry"
  })
  contactRecordsFunction({ data, error }) {
    if (data) {
      console.log("Data contacts:", data);
    } else if (error) {
      console.log("Error :", error);
    }
  }

  filterChangeHandler(event) {
    this.selectedAccountId = event.detail.accountId;
    console.log("this.selectedAccountId :", this.selectedAccountId);

    this.selecetdIndustry = event.detail.industry;
  }
}
