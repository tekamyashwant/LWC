import { LightningElement, api, wire } from "lwc";
import getAccountRecords from "@salesforce/apex/accountHelper.getAccountRecords";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_RECORD_ID from "@salesforce/schema/Account.Id";
import ACCOUNT_NAME from "@salesforce/schema/Account.Name";
import ACCOUNT_PARENT from "@salesforce/schema/Account.ParentId";
import ACCOUNT_SLAEXPIRYDATE from "@salesforce/schema/Account.SLAExpirationDate__c";
import ACCOUNT_NOOFLOCATIONS from "@salesforce/schema/Account.NumberofLocations__c";
import ACCOUNT_DESCRIPTION from "@salesforce/schema/Account.Description";
import ACCOUNT_SLATYPE_FIELD from "@salesforce/schema/Account.SLA__c";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import {
  createRecord,
  deleteRecord,
  getFieldValue,
  getRecord,
  updateRecord
} from "lightning/uiRecordApi";
import { NavigationMixin } from "lightning/navigation";
const fieldstoLoad = [
  ACCOUNT_NAME,
  ACCOUNT_PARENT,
  ACCOUNT_SLAEXPIRYDATE,
  ACCOUNT_SLATYPE_FIELD,
  ACCOUNT_NOOFLOCATIONS,
  ACCOUNT_DESCRIPTION
];

export default class AccountDetails extends NavigationMixin(LightningElement) {
  @api recordId;
  parentoptions = [];
  selectedAccount = "";
  selnooflocations = "1";
  selAccName = "";
  selExpDate = null;
  selSlaType = "";
  selNoOfLocations = "";
  selDescription = "";

  @wire(getRecord, {
    recordId: "$recordId",
    fields: fieldstoLoad
  })
  wiredgetRecords_Function({ data, error }) {
    if (data) {
      console.log("Data retrival", data);
      this.selectedAccount = getFieldValue(data, ACCOUNT_PARENT);
      this.selAccName = getFieldValue(data, ACCOUNT_NAME);
      this.selExpDate = getFieldValue(data, ACCOUNT_SLAEXPIRYDATE);
      this.selSlaType = getFieldValue(data, ACCOUNT_SLATYPE_FIELD);
      this.selNoOfLocations = getFieldValue(data, ACCOUNT_NOOFLOCATIONS);
      this.selDescription = getFieldValue(data, ACCOUNT_DESCRIPTION);
    } else if (error) {
      console.log("Error while retrival", error);
    }
  }
  @wire(getAccountRecords)
  accountRecordsFunction({ data, error }) {
    if (data) {
      this.parentoptions = data.map((curritem) => ({
        label: curritem.Name,
        value: curritem.Id
      }));
    } else if (error) {
      console.log("Error :", error);
    }
  }

  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$accountInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_SLATYPE_FIELD
  })
  slatypePiclist;

  get titleformat() {
    if (this.recordId) {
      return "Edit Record";
    } else {
      return "Create Record";
    }
  }

  get isDeletable() {
    if (this.recordId) {
      return true;
    } else {
      return false;
    }
  }

  handleChange(event) {
    let { name, value } = event.target;
    if (name === "parentacc") {
      this.selectedAccount = value;
      console.log("SelecetdAccount", this.selectedAccount);
    }

    if (name === "accname") {
      this.selAccName = value;
      console.log("selAccName", this.selAccName);
    }

    if (name === "slaexpdt") {
      this.selExpDate = value;
      console.log("selExpDate", this.selExpDate);
    }

    if (name === "slatype") {
      this.selSlaType = value;
      console.log("selSlaType", this.selSlaType);
    }

    if (name === "nooflocations") {
      this.selNoOfLocations = value;
      console.log("selNoOfLocations", this.selNoOfLocations);
    }

    if (name === "description") {
      this.selDescription = value;
      console.log("selDescription", this.selDescription);
    }
  }

  saveRecord(event) {
    if (this.validateInput()) {
      let inputFields = {};
      inputFields[ACCOUNT_PARENT.fieldApiName] = this.selectedAccount;
      inputFields[ACCOUNT_NAME.fieldApiName] = this.selAccName;
      inputFields[ACCOUNT_SLAEXPIRYDATE.fieldApiName] = this.selExpDate;
      inputFields[ACCOUNT_SLATYPE_FIELD.fieldApiName] = this.selSlaType;
      inputFields[ACCOUNT_NOOFLOCATIONS.fieldApiName] = this.selNoOfLocations;
      inputFields[ACCOUNT_DESCRIPTION.fieldApiName] = this.selDescription;

      if (this.recordId) {
        inputFields[ACCOUNT_RECORD_ID.fieldApiName] = this.recordId;
        let recordInput = {
          fields: inputFields
        };
        updateRecord(recordInput)
          .then((result) => {
            console.log("Record updated successfully.", result);
            this.showToast();
          })
          .catch((error) => {
            console.log("Record updatation failed.", error);
          });
      } else {
        let recordInput = {
          apiName: ACCOUNT_OBJECT.objectApiName,
          fields: inputFields
        };
        createRecord(recordInput)
          .then((result) => {
            console.log("Record is created successsfully!!", result);
            let pageRef = {
              type: "standard__recordPage",
              attributes: {
                recordId: result.id,
                objectApiName: ACCOUNT_OBJECT.objectApiName,
                actionName: "view"
              }
            };
            this[NavigationMixin.Navigate](pageRef);
          })
          .catch((error) => {
            console.log("Error occurred.", error);
          });
      }
    } else {
      console.log("Error occuring while creating or updating record.");
    }
  }

  validateInput() {
    let fields = Array.from(this.template.querySelectorAll(".validateme"));
    let isValid = fields.every((curritem) => curritem.checkValidity());
    return isValid;
  }

  showToast() {
    const event = new ShowToastEvent({
      title: "Success",
      message: "Record Updated Successfully.",
      variant: "success"
    });
    this.dispatchEvent(event);
  }

  deleteHandler(event) {
    deleteRecord(this.recordId)
      .then(() => {
        console.log("Record is deleted.");

        // Navigates to account list with the filter set to Recent.
        let pageRef = {
          type: "standard__objectPage",
          attributes: {
            objectApiName: ACCOUNT_OBJECT,
            actionName: "list"
          },
          state: {
            filterName: "AllAccounts"
          }
        };
        this[NavigationMixin.Navigate](pageRef);
      })
      .catch((error) => {
        console.log("Record deletion is failed.", error);
      });
  }
}
