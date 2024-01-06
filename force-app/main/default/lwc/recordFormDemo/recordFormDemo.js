import { LightningElement, api } from "lwc";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import RATING_FIELD from "@salesforce/schema/Account.Rating";
import REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

export default class RecordFormDemo extends NavigationMixin(LightningElement) {
  @api recordId;
  @api objectApiName;
  fields = [NAME_FIELD, INDUSTRY_FIELD, RATING_FIELD, REVENUE_FIELD];
  showToast() {
    const event = new ShowToastEvent({
      title: "Success!!!",
      message: "Record updated successfully.",
      variant: "success"
    });
    this.dispatchEvent(event);
  }

  submitHandler(event) {
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
}
