import { LightningElement } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin } from "lightning/navigation";

export default class CreateRecordinFlow extends NavigationMixin(
  LightningElement
) {
  statusChangeHandler(event) {
    if (event.detail.status === "FINISHED") {
      const eventShow = new ShowToastEvent({
        title: "SUCCESS!!!",
        message: "Record Created Successfully.",
        variant: "success"
      });
      this.dispatchEvent(eventShow);
      console.log(event.detail.outputVariables);
      let outputRecords = event.detail.outputVariables;
      for (let i = 0; i < outputRecords.length; i++) {
        let outRec = outputRecords[i];
        if (outRec.name === "accountID") {
          this[NavigationMixin.Navigate]({
            type: "standard__recordPage",
            attributes: {
              recordId: outRec.value,
              objectApiName: "Account",
              actionName: "view"
            }
          });
        }
      }
    }
  }
}
