import { LightningElement, wire, api } from "lwc";
import searchRecords from "@salesforce/apex/customLookupController.searchRecords";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
const DELAY = 300; //milliseconds

export default class MultiCustomLookUp extends LightningElement {
  searchkey;
  @api objectApiName = "Account";
  searchedRecords = [];
  diplayRecords = false;
  @api label = "Account";
  @api iconName = "standard:account";
  Delaytimeout;
  selectedRecords = [];
  selected = false;

  @wire(searchRecords, {
    searchkey: "$searchkey",
    objectApiName: "$objectApiName"
  })
  outputRecordsFunction({ data, error }) {
    if (data) {
      this.diplayRecords = data.length > 0 ? true : false;
      this.searchedRecords = data;
      console.log("Multi data:", this.searchedRecords);
    } else if (error) {
      console.log("error:", error);
    }
  }

  changeHandler(event) {
    window.clearTimeout(this.Delaytimeout);
    let value = event.target.value;
    // eslint-disable-next-line @lwc/lwc/no-async-operation
    this.Delaytimeout = setTimeout(() => {
      this.searchkey = value;
    }, DELAY);
  }

  clickHandler(event) {
    let recId = event.target.getAttribute("data-recid");
    console.log("selected Id:", recId);
    if (this.validateDuplicate(recId)) {
      let selectedval = this.searchedRecords.find(
        (currItem) => currItem.Id === recId
      );
      let pill = {
        type: "icon",
        label: selectedval.Name,
        name: recId,
        iconName: this.iconName,
        alternativeText: selectedval.Name
      };
      this.selectedRecords = [...this.selectedRecords, pill];
    }
  }

  handleItemRemove(event) {
    const index = event.detail.index;
    this.selectedRecords.splice(index, 1);
    console.log("Searched Items:", this.selectedRecords);
  }

  validateDuplicate(Records) {
    let valid = true;
    let isAlreadySelected = this.selectedRecords.find(
      (currItem) => currItem.name === Records
    );
    if (isAlreadySelected) {
      valid = false;
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Success!",
          message: "Record is Already Available!",
          variant: "error"
        })
      );
    } else {
      valid = true;
    }
    return valid;
  }
}
