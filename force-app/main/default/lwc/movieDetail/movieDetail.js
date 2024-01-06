import { LightningElement, wire } from "lwc";
import {
  subscribe,
  unsubscribe,
  APPLICATION_SCOPE,
  MessageContext
} from "lightning/messageService";
import MOVIE_CHANNEL from "@salesforce/messageChannel/movieSearch__c";

export default class MovieDetail extends LightningElement {
  subscription = null;
  loadComponent = false;
  movieDetails = {};
  @wire(MessageContext)
  messageContext;

  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  subscribeToMessageChannel() {
    if (!this.subscription) {
      this.subscription = subscribe(
        this.messageContext,
        MOVIE_CHANNEL,
        (message) => this.handleMessage(message),
        { scope: APPLICATION_SCOPE }
      );
    }
  }

  handleMessage(message) {
    let movieId = message.movieId;
    console.log("MovieId", movieId);
    this.fetchMovieDetails(movieId);
  }

  disconnectedCallback() {
    this.unsubscribeToMessageChannel();
  }

  unsubscribeToMessageChannel() {
    unsubscribe(this.subscription);
    this.subscription = null;
  }

  async fetchMovieDetails(movieId) {
    const url = `https://www.omdbapi.com/?i=${movieId}&plot=full&apikey=6a360c20`;
    const res = await fetch(url);
    const data = await res.json();
    console.log("Movie Details:", data);
    this.loadComponent = true;
    this.movieDetails = data;
  }
}
