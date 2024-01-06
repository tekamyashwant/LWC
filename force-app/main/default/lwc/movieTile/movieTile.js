import { LightningElement, api } from "lwc";

export default class MovieTile extends LightningElement {
  @api movie;
  @api selectedmovieid = "";

  clickHandler(event) {
    this.dispatchEvent(
      new CustomEvent("selectedcard", {
        detail: this.movie.imdbID
      })
    );
  }

  get tileSelected() {
    return this.selectedmovieid === this.movie.imdbID
      ? "tile selected"
      : "tile";
  }
}
