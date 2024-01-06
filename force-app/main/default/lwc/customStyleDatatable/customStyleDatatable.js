import { LightningElement, wire } from "lwc";
import getContactListForDatatable from "@salesforce/apex/contactController.getContactListForDatatable";
const columns = [
  {
    label: "Name",
    type: "customName",
    typeAttributes: {
      contactName: {
        fieldName: "Name"
      }
    }
  },
  {
    label: "Account Name",
    fieldName: "accountLink",
    type: "url",
    typeAttributes: {
      label: {
        fieldName: "accountName"
      },
      target: "_blank"
    }
  },
  {
    label: "Title",
    fieldName: "Title",
    cellAttributes: {
      class: {
        fieldName: "titlecolor"
      }
    }
  },
  {
    label: "Rank",
    fieldName: "Rank__c",
    type: "customRank",
    typeAttributes: {
      rankIcon: {
        fieldName: "rankIconname"
      }
    }
  },
  { label: "Phone", fieldName: "Phone", type: "phone" },
  { label: "Email", fieldName: "Email", type: "email" },
  {
    label: "Picture",
    type: "customPicture",
    typeAttributes: {
      customPicture: {
        fieldName: "Picture__c"
      }
    },
    cellAttributes: {
      alignment: "center"
    }
  }
];

export default class CustomStyleDatatable extends LightningElement {
  contacts;
  columns = columns;
  @wire(getContactListForDatatable) wiredContacts({ data, error }) {
    if (data) {
      console.log(data);
      //this.contacts = data;
      this.contacts = data.map((record) => {
        let accountLink = "/" + record.AccountId;
        let accountName = record.Account.Name;
        let titlecolor = "";
        let rankIconname = record.Rank__c > 5 ? "utility:ribbon" : "";
        if (record.Rank__c === 8) {
          titlecolor = "slds-text-color_success";
        } else {
          titlecolor = "slds-text-color_error";
        }
        return {
          ...record,
          accountLink: accountLink,
          accountName: accountName,
          titlecolor: titlecolor,
          rankIconname: rankIconname
        };
      });
    } else if (error) {
      console.log(error);
    }
  }
}
