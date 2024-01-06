import { LightningElement, wire } from "lwc";
import { getObjectInfos } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import CONTACT_OBJECT from "@salesforce/schema/Contact";
export default class GetObjectInfosDemoMultObjects extends LightningElement {
  objectsInfos;
  objectsInfoserror;
  objectApiNames = [ACCOUNT_OBJECT, CONTACT_OBJECT];
  @wire(getObjectInfos, {
    objectApiNames: "$objectApiNames"
  })
  objectInfo({ data, error }) {
    if (data) {
      console.log("DATA :", data);
      this.objectsInfos = data;
      this.objectsInfoserror = null;
    } else if (error) {
      console.log("Error :", error);
      this.objectsInfos = null;
      this.objectsInfoserror = error;
    }
  }
}
