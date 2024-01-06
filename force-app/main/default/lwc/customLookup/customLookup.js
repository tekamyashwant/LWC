/* eslint-disable @lwc/lwc/no-async-operation */
import { LightningElement, wire, api } from "lwc";
import searchRecords from "@salesforce/apex/customLookupController.searchRecords";
const DELAY = 300;

export default class CustomLookup extends LightningElement {
  @api apiName;
  searchvalue;
  @api objectLabel;
  @api iconName;
  delayTimeout;
  selectedRecord = {
    selectedId: "",
    selectedName: ""
  };
  displayOptions = false;

  @wire(searchRecords, {
    objectApiName: "$apiName",
    searchkey: "$searchvalue"
  })
  outputs;

  get isRecordSelected() {
    return this.selectedRecord.selectedId === "" ? false : true;
  }

  changeHandler(event) {
    window.clearTimeout(this.delayTimeout);
    let enteredValue = event.target.value;
    console.log("enteredValue", enteredValue);

    //debouncing= do not update the reactive property as long as this function is
    //being called within a delay

    this.delayTimeout = setTimeout(() => {
      this.searchvalue = enteredValue;
      this.displayOptions = true;
    }, DELAY);
    console.log("searchvalue", this.searchvalue);
  }

  clickHandler(event) {
    let selectId = event.currentTarget.dataset.item;
    console.log("selectId", selectId);
    let outputRecord = this.outputs.data.find(
      (currItem) => currItem.Id === selectId
    );
    console.log("outputRecord:", outputRecord.Id);
    this.selectedRecord = {
      selectedId: outputRecord.Id,
      selectedName: outputRecord.Name
    };
    this.sendSelection();
    this.displayOptions = false;
  }

  removalHandler() {
    this.selectedRecord = {
      selectedId: "",
      selectedName: ""
    };
    this.sendSelection();
    this.displayOptions = false;
  }

  sendSelection() {
    let mySelectionEvent = new CustomEvent("selectedrec", {
      detail: this.selectedRecord.selectedId
    });
    this.dispatchEvent(mySelectionEvent);
  }
}
