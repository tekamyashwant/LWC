import { LightningElement, track } from "lwc";

export default class WelcomeTechJourney extends LightningElement {
  greeting = "Hello";
  @track welcome = "Welcome to tech journey.";
  clickHandler(event) {
    this.greeting = "Namaste";
    this.welcome = "Today is day 19 of bootcamp.";
  }
}
