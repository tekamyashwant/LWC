import { LightningElement } from "lwc";

export default class RenderListDemo extends LightningElement {
  Superstar = ["Superman", "Batman", "IronMan", "Hulk", "Thor"];

  companyInfo = [
    {
      id: 1,
      firstname: "Marc",
      lastname: "Benioff"
    },
    {
      id: 2,
      firstname: "Elon",
      lastname: "Musk"
    },
    {
      id: 3,
      firstname: "Sunder",
      lastname: "Pichai"
    },
    {
      id: 4,
      firstname: "Mark",
      lastname: "Zuckerburg"
    },
    {
      id: 5,
      firstname: "Bill",
      lastname: "Gates"
    }
  ];
}
