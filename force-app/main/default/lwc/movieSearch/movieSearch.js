/* eslint-disable no-unused-expressions */
import { LightningElement, wire } from "lwc";
import { publish, MessageContext } from "lightning/messageService";
import MOVIE_CHANNEL from "@salesforce/messageChannel/movieSearch__c";
const DELAY = 300;

export default class MovieSearch extends LightningElement {
  selectedType = "";
  selectedSearch = "";
  selectedPage = "1";
  delayTimeout;
  isloading = false;
  searchResults = [];
  selectedMovie = "";

  @wire(MessageContext)
  messageContext;

  get typeoptions() {
    return [
      // { label: "None", value: "" },
      { label: "Movie", value: "movie" },
      { label: "Series", value: "series" },
      { label: "Episode", value: "episode" }
    ];
  }

  handleChange(event) {
    let { name, value } = event.target;
    this.isloading = true;
    if (name === "type") {
      this.selectedType = value;
      console.log("selectedType", this.selectedType);
    } else if (name === "moviesearch") {
      this.selectedSearch = value;
      console.log("selectedSearch", this.selectedSearch);
    } else if (name === "pageno") {
      this.selectedPage = value;
      console.log("selectedPage", this.selectedPage);
    }
    clearTimeout(this.delayTimeout);
    this.delayTimeout = setTimeout(() => {
      this.moviesearch();
    }, DELAY);
  }

  async moviesearch() {
    this.isloading = false;
    const url = `https://www.omdbapi.com/?s=${this.selectedSearch}&page=${this.selectedPage}&type=${this.selectedType}&apikey=6a360c20`;
    let res = await fetch(url);
    let data = await res.json();
    console.log("Movie Searched:", data);
    if (data.Response === "True") {
      this.searchResults = data.Search;
    }
  }

  get movieTileDisplay() {
    return this.searchResults.length > 0 ? true : false;
  }

  movieClickHandler(event) {
    this.selectedMovie = event.detail;

    const payload = { movieId: this.selectedMovie };

    publish(this.messageContext, MOVIE_CHANNEL, payload);
  }
}
