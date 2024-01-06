import { LightningElement, api } from "lwc";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import { CloseActionScreenEvent } from "lightning/actions";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class ScreenQuickActionDemo extends LightningElement {
  @api recordId;
  @api objectApiName;

  fields = {
    accountName: NAME_FIELD,
    accountIndustry: INDUSTRY_FIELD
  };

  removeHandler() {
    this.dispatchEvent(new CloseActionScreenEvent());
  }

  successHandler() {
    this.dispatchEvent(new CloseActionScreenEvent());
    const event = new ShowToastEvent({
      title: "Success",
      message: "Record Saved Successfully!",
      variant: "success"
    });
    this.dispatchEvent(event);
  }
}
