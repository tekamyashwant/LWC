import { LightningElement, wire } from "lwc";
import { getRecords } from "lightning/uiRecordApi";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import CONTACT_NAME_FIELD from "@salesforce/schema/Contact.Name";
export default class GetRecordsDemo extends LightningElement {
  @wire(getRecords, {
    records: [
      {
        recordIds: ["0012w00001IDEGdAAP", "0012w00001IDEGcAAP"],
        fields: ACCOUNT_NAME_FIELD
      },
      {
        recordIds: ["0032w00000xgkAiAAI"],
        fields: CONTACT_NAME_FIELD
      }
    ]
  })
  outputDetails;
}
