import { LightningElement, wire, api } from "lwc";
import getContactBasedOnAccount from "@salesforce/apex/contactController.getContactBasedOnAccount";
import { deleteRecord, updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { refreshApex } from "@salesforce/apex";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import CONTACT_OBJECT from "@salesforce/schema/Contact";
import LEADSOURCE_OPTIONS from "@salesforce/schema/Contact.LeadSource";

const ACTIONS = [
  { label: "View", name: "view" },
  { label: "Edit", name: "edit" },
  { label: "Delete", name: "delete" }
];

const DEFAULT_ACTION = [
  {
    label: "All",
    checked: true,
    name: "all"
  }
];
const columns = [
  {
    label: "First Name",
    fieldName: "FirstName",
    editable: true,
    hideDefaultActions: true
  },
  {
    label: "Last Name",
    fieldName: "LastName",
    editable: true,
    hideDefaultActions: true
  },
  {
    label: "Title",
    fieldName: "Title",
    editable: true,
    hideDefaultActions: true
  },
  {
    label: "Phone",
    fieldName: "Phone",
    type: "phone",
    editable: true,
    hideDefaultActions: true
  },
  {
    label: "Email",
    fieldName: "Email",
    type: "email",
    editable: true,
    hideDefaultActions: true
  },
  {
    label: "Lead Source",
    fieldName: "LeadSource",
    type: "customPicklist",
    editable: true,
    typeAttributes: {
      options: {
        fieldName: "pickListOptions"
      },
      value: {
        fieldName: "LeadSource"
      },
      context: {
        fieldName: "Id"
      }
    },
    hideDefaultActions: true,
    actions: DEFAULT_ACTION
  },
  { type: "action", typeAttributes: { rowActions: ACTIONS } }
];
export default class EditDatatableRows extends LightningElement {
  @api recordId;
  contactData = [];
  columns = columns;
  draftValues = [];
  contactPropertyResult;
  LeadSourceOptions = [];
  viewMode = false;
  editMode = false;
  showModal = false;
  selectedRecordId;
  leadSourceActions = [];
  loadActionData = false;
  contactAllData = [];
  @wire(getContactBasedOnAccount, {
    accountId: "$recordId",
    pickList: "$LeadSourceOptions"
  })
  outputContactData(result) {
    this.contactPropertyResult = result;
    if (result.data) {
      //this.contactData = result.data;
      this.contactData = result.data.map((currItem) => {
        let pickListOptions = this.LeadSourceOptions;
        return {
          ...currItem,
          pickListOptions: pickListOptions
        };
      });
      this.contactAllData = [...this.contactData];
    } else if (result.error) {
      console.log("Error while loading records.");
    }
  }

  @wire(getObjectInfo, { objectApiName: CONTACT_OBJECT }) wiredObjectInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$wiredObjectInfo.data.defaultRecordTypeId",
    fieldApiName: LEADSOURCE_OPTIONS
  })
  wiredPicklistFunction({ data, error }) {
    if (data) {
      this.LeadSourceOptions = data.values;
      console.log("this.LeadSourceOptions", this.LeadSourceOptions);
      this.leadSourceActions = [];
      data.values.forEach((currItem) => {
        this.leadSourceActions.push({
          label: currItem.label,
          checked: false,
          name: currItem.value
        });
      });
      this.columns.forEach((currItem) => {
        if (currItem.fieldName === "LeadSource") {
          currItem.actions = [...currItem.actions, ...this.leadSourceActions];
        }
      });
      this.loadActionData = true;
    } else if (error) {
      console.log("Error occurred while loading data.", error);
    }
  }

  async saveHandler(event) {
    let records = event.detail.draftValues;
    let updateRecordArray = records.map((record) => {
      let inputRecord = { ...record };
      return {
        fields: inputRecord
      };
    });

    this.draftValues = [];

    let updateRecordArrayPromise = updateRecordArray.map((currItem) =>
      updateRecord(currItem)
    );
    await Promise.all(updateRecordArrayPromise);

    const toastevent = new ShowToastEvent({
      title: "Success",
      message: "Record Updated Successfully!!!",
      variant: "success"
    });
    this.dispatchEvent(toastevent);

    await refreshApex(this.contactPropertyResult);
  }

  rowActionHandler(event) {
    let action = event.detail.action;
    let row = event.detail.row;
    this.selectedRecordId = row.Id;
    this.viewMode = false;
    this.editMode = false;
    this.showModal = false;
    if (action.name === "view") {
      this.viewMode = true;
      this.showModal = true;
    } else if (action.name === "edit") {
      this.editMode = true;
      this.showModal = true;
    } else if (action.name === "delete") {
      this.deleteHandler();
    }
  }

  async deleteHandler() {
    try {
      await deleteRecord(this.selectedRecordId);
      const event = new ShowToastEvent({
        title: "Success",
        message: "Record Deleted Successfully.",
        variant: "success"
      });
      this.dispatchEvent(event);
      await refreshApex(this.contactPropertyResult);
    } catch (error) {
      const event = new ShowToastEvent({
        title: "Error",
        message: error.body.message,
        variant: "error"
      });
      this.dispatchEvent(event);
    }
  }

  async closeModal() {
    this.showModal = false;
    if (this.editMode) {
      await refreshApex(this.contactPropertyResult);
    }
  }

  headerActionHandler(event) {
    let actionName = event.detail.action.name;
    let colDef = event.detail.columnDefinition;
    const cols = [...this.columns];

    console.log("Action Name", actionName);
    console.log("Column Definition", colDef);
    if (actionName === "all") {
      this.contactData = [...this.contactAllData];
    } else {
      this.contactData = this.contactAllData.filter(
        (currItem) => actionName === currItem["LeadSource"]
      );
    }

    cols
      .find((currItem) => currItem.fieldName === "LeadSource")
      .actions.forEach((currItem) => {
        if (currItem.name === actionName) {
          currItem.checked = true;
        } else {
          currItem.checked = false;
        }
      });

    this.columns = [...cols];
  }

  get displayData() {
    if (this.contactData && this.loadActionData === true) {
      return true;
    } else {
      return false;
    }
  }
}
