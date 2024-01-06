import { LightningElement, api } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACCOUNT_SLAEXPDATE_FIELD from "@salesforce/schema/Account.SLAExpirationDate__c";
import { NavigationMixin } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class RecordEditFormDemo extends NavigationMixin(
  LightningElement
) {
  @api recordId;
  @api objectApiName;
  fields = {
    name: ACCOUNT_NAME_FIELD,
    industry: ACCOUNT_INDUSTRY_FIELD,
    sladate: ACCOUNT_SLAEXPDATE_FIELD
  };

  successHandler(event) {
    console.log("Record Id:", event.detail);
    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: event.detail.id,
        objectApiName: this.objectApiName,
        actionName: "view"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  errorHandler(event) {
    const Cusevent = new ShowToastEvent({
      title: "Error!",
      message: event.detail.message,
      variant: "error"
    });
    this.dispatchEvent(Cusevent);
  }

  submitHandler(event) {
    event.preventDefault();
    console.log("Fields :", event.detail);
    let fields = event.detail.fields;
    if (!fields.Industry) {
      fields.Industry = "Energy";
    }
    this.template.querySelector("lightning-record-edit-form").submit(fields);
  }

  clickHandler(event) {
    let infos = this.template.querySelectorAll("lightning-input-field");
    infos.forEach((currItem) => currItem.reset());
  }
}
