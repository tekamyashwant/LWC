import { LightningElement, wire } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";
import { NavigationMixin } from "lightning/navigation";

export default class ContactFilter extends NavigationMixin(LightningElement) {
  selectedAccountId;
  selectedIndustry;
  isButtonDisabled = true;

  @wire(getObjectInfo, {
    objectApiName: ACCOUNT_OBJECT
  })
  accountObjInfo;

  @wire(getPicklistValues, {
    recordTypeId: "$accountObjInfo.data.defaultRecordTypeId",
    fieldApiName: ACCOUNT_INDUSTRY_FIELD
  })
  accountIndustry;

  selectedRecordHandler(event) {
    this.selectedAccountId = event.detail;
    console.log(this.selectedAccountId);
    if (this.selectedAccountId) {
      this.isButtonDisabled = false;
    } else {
      this.isButtonDisabled = true;
    }
    this.notifyFilterChange();
  }

  handleChange(event) {
    this.selectedIndustry = event.target.value;
    this.notifyFilterChange();
  }

  clickHandler(event) {
    let defaultValues = encodeDefaultFieldValues({
      AccountId: this.selectedAccountId
    });

    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Contact",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  notifyFilterChange() {
    let myfilterChange = new CustomEvent("filterchange", {
      detail: {
        accountId: this.selectedAccountId,
        industry: this.selectedIndustry
      }
    });
    this.dispatchEvent(myfilterChange);
  }
}
