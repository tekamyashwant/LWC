import { LightningElement, api, wire } from "lwc";
import NAME_FIELD from "@salesforce/schema/Account.Name";
import TICKER_FIELD from "@salesforce/schema/Account.TickerSymbol";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import updateAccountRecord from "@salesforce/apex/accountHelper.updateAccountRecord";
import { notifyRecordUpdateAvailable } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
export default class ImperativeApexUpdateDemo extends LightningElement {
  @api recordId;
  accName = "";
  accTicker = "";

  @wire(getRecord, {
    recordId: "$recordId",
    fields: [NAME_FIELD, TICKER_FIELD]
  })
  outputFunction({ data, error }) {
    if (data) {
      console.log("Records :", data);
      this.accName = getFieldValue(data, NAME_FIELD);
      this.accTicker = getFieldValue(data, TICKER_FIELD);
    } else if (error) {
      console.log("Records error :", error);
    }
  }
  changeHandler(event) {
    this.accTicker = event.target.value;
  }

  clickHandler() {
    updateAccountRecord({ recordId: this.recordId, ticker: this.accTicker })
      .then((result) => {
        console.log("Record updated successfully", result);
        notifyRecordUpdateAvailable([{ recordId: this.recordId }]);
        const event = new ShowToastEvent({
          title: "Success!",
          message: "Record updated successfully",
          variant: "success"
        });
        this.dispatchEvent(event);
      })
      .catch((error) => {
        console.log("Error occurred while updating record", error);
      });
  }
}
