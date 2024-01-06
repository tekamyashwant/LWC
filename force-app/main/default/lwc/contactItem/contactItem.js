import { LightningElement, api } from "lwc";

export default class ContactItem extends LightningElement {
  @api contact;

  clickHandler(event) {
    //to prevent the default behaviour of anchor element
    event.preventDefault();

    const selectContact = new CustomEvent("selectedcontact", {
      detail: this.contact.Id
    });
    this.dispatchEvent(selectContact);
  }
}
