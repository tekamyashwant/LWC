import { LightningElement, wire } from "lwc";
import { getObjectInfo } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
export default class GetObjectInfoDemo extends LightningElement {
  accountInfo;
  accountError;
  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountInfoFunction({ data, error }) {
    if (data) {
      console.log("Data:", data);
      this.accountInfo = data;
      this.accountError = null;
    } else if (error) {
      console.log("error:", error);
      this.accountInfo = null;
      this.accountError = error;
    }
  }
}
