import { LightningElement } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { encodeDefaultFieldValues } from "lightning/pageReferenceUtils";

export default class NavigationDemo extends NavigationMixin(LightningElement) {
  navHomePageHandler() {
    let pageRef = {
      type: "standard__namedPage",
      attributes: {
        pageName: "home"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  navAccountListViewPageHandler() {
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "list"
      },
      state: {
        filterName: "PlatinumandGoldSLACustomers"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  createAccountPageHandler() {
    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "new"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  createAccountDefaultValuesPageHandler() {
    const defaultValues = encodeDefaultFieldValues({
      Industry: "Media",
      Rating: "Hot"
    });

    let pageRef = {
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Account",
        actionName: "new"
      },
      state: {
        defaultFieldValues: defaultValues
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }

  editAccountPageHandler() {
    let pageRef = {
      type: "standard__recordPage",
      attributes: {
        recordId: "0012w00001IDEGdAAP",
        objectApiName: "Account",
        actionName: "edit"
      }
    };
    this[NavigationMixin.Navigate](pageRef);
  }
}
