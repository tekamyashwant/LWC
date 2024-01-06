import { LightningElement, wire } from "lwc";
import {
  getPicklistValuesByRecordType,
  getObjectInfo
} from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class GetPicklistValuesByRecordTypeDemo extends LightningElement {
  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountInfo;

  @wire(getPicklistValuesByRecordType, {
    objectApiName: ACCOUNT_OBJECT,
    recordTypeId: "$accountInfo.data.defaultRecordTypeId"
  })
  accountPicklistValuesData;
}
