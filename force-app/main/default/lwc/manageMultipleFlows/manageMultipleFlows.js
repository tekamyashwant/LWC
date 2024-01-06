import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import { LightningElement, api, wire } from "lwc";
import ACCOUNT_RATING from "@salesforce/schema/Account.Rating";

export default class ManageMultipleFlows extends LightningElement {
  @api recordId;
  accountRating;
  @wire(getRecord, { recordId: "$recordId", fields: ACCOUNT_RATING })
  getRecordOutputFunction({ data, error }) {
    if (data) {
      this.accountRating = getFieldValue(data, ACCOUNT_RATING);
      console.log("Rating :", this.accountRating);
    } else if (error) {
      console.log("Error", error);
    }
  }

  get inputVariables() {
    return [
      { name: "accountRating", type: "String", value: this.accountRating }
    ];
  }

  get isHotRating() {
    return this.accountRating === "Hot" ? true : false;
  }

  get isWarmRating() {
    return this.accountRating === "Warm" ? true : false;
  }

  get isColdRating() {
    return this.accountRating === "Cold" ? true : false;
  }
}
