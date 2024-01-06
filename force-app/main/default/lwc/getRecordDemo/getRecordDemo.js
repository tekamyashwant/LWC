import { LightningElement, wire, api } from "lwc";
import {
  getRecord,
  getFieldValue,
  getFieldDisplayValue
} from "lightning/uiRecordApi";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";

export default class GetRecordDemo extends LightningElement {
  @api recordId;
  accountName;
  accountRevenue;
  @wire(getRecord, {
    recordId: "$recordId",
    fields: [ACCOUNT_NAME_FIELD, ACCOUNT_REVENUE_FIELD]
  })
  recordInfoFunction({ data, error }) {
    if (data) {
      console.log("Data :", data);
      this.accountName = getFieldValue(data, ACCOUNT_NAME_FIELD);
      this.accountRevenue = getFieldDisplayValue(data, ACCOUNT_REVENUE_FIELD);
    } else if (error) {
      console.log("Error", error);
    }
  }
}
