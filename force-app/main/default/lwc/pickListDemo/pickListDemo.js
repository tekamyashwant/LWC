import { getPicklistValues, getObjectInfo } from "lightning/uiObjectInfoApi";
import { LightningElement, wire } from "lwc";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class PickListDemo extends LightningElement {
  value;
  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountInfo;
  // accountInfos({data,error}){
  //   if(data){
  //     console.log('data :',JSON.stringify(data.defaultRecordTypeId));
  //   }else if(error){
  //     console.log('error:',error);
  //   }
  // }

  @wire(getPicklistValues, {
    recordTypeId: "$accountInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_INDUSTRY_FIELD
  })
  picklistValues;
  // picklistValues({data,error}){
  //   if(data){
  //     console.log('DATA :',JSON.stringify(data.values));
  //   }else if(error){

  //   }
  //}

  handleChange(event) {
    this.value = event.target.value;
  }
}
