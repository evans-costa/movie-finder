import { Movie } from "./Movie.js";

export class MovieView extends Movie {
  constructor(root) {
    super(root);
    this.movieView();
  }

  movieView() {
    const searchButton = this.root.querySelector("button.search-button");

    searchButton.onclick = () => {
      const { value } = this.root.querySelector(".search-container input");
      this.findMovie(value);
    };
  }
}
