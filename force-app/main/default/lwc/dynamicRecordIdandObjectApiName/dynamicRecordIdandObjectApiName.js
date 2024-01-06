import { LightningElement, api } from "lwc";

export default class DynamicRecordIdandObjectApiName extends LightningElement {
  @api recordId;
  @api objectApiName;
}
