import { LightningElement, wire } from "lwc";
import getAccountRecords from "@salesforce/apex/accountHelper.getAccountRecords";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class ImperativeApexDemo extends LightningElement {
  data;
  columns = [
    { label: "Account Name", fieldName: "Name" },
    { label: "Account Industry", fieldName: "Industry" },
    { label: "Account Rating", fieldName: "Rating" }
  ];
  industryOptions;
  selectedIndustry;

  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT }) objectInfoProperty;

  @wire(getPicklistValues, {
    recordTypeId: "$objectInfoProperty.data.defaultRecordTypeId",
    fieldApiName: INDUSTRY_FIELD
  })
  picklistInfoFunction({ data, error }) {
    if (data) {
      console.log("Data :", data);
      this.industryOptions = data;
    } else if (error) {
      console.log("Error :", error);
    }
  }

  handleChange(event) {
    this.selectedIndustry = event.target.value;
  }

  clickHandler() {
    getAccountRecords({ accountIndustry: this.selectedIndustry })
      .then((result) => {
        console.log("Account Records :", result);
        this.data = result;
      })
      .catch((error) => {
        console.log("Error Occurred :", error);
      });
  }
}
