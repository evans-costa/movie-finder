import { MovieApi } from "./api/MovieApi.js";

export class Movie {
  constructor(root) {
    this.root = document.querySelector(root);
    this.result = this.root.querySelector(".results");
  }

  async findMovie(movieName) {
    try {
      const movie = await MovieApi.search(movieName);

      const isInputEmpty = this.root.querySelector(".search-container input").value === "";

      if (isInputEmpty) {
        throw new Error("Please, enter a movie name.");
      }

      if (movie.Title === undefined) {
        throw new Error("Movie not found!");
      }

      this.renderView(movie);
    } catch (error) {
      this.result.innerHTML = `<h3 class="error-msg">${error.message}</h3>`;
    }
  }

  createResultView() {
    const resultDiv = document.createElement("div");

    resultDiv.innerHTML = `
    <div id="movie">
      <div class="movie-info">
        <img
          src=""
          alt=""
        />
        <div class="movie-details">
          <h2 class="title"></h2>
          <div class="rating">
            <img src="images/star.png" alt="rating star" />
            <span></span>
          </div>
          <div class="rated-year-duration">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="genre">
          </div>
        </div>
      </div>
      <div class="plot-cast">
        <div class="plot">
          <h3>Plot:</h3>
          <p>
          </p>
        </div>
        <div class="cast">
          <h3>Cast:</h3>
          <p></p>
        </div>
      </div>
    </div>
    `;

    return resultDiv;
  }

  renderView(movie) {
    this.removePreviousMovieSearch();
    const movieInfo = this.createResultView();

    movieInfo.querySelector(".movie-info img").src = `${movie.Poster}`;
    movieInfo.querySelector(".movie-info img").alt = `${movie.Title} movie poster`;
    movieInfo.querySelector(".title").textContent = `${movie.Title}`;
    movieInfo.querySelector(".rating span").textContent = `${movie.imdbRating}`;
    movieInfo.querySelector(".rated-year-duration span:nth-child(1)").textContent = `${movie.Rated}`;
    movieInfo.querySelector(".rated-year-duration span:nth-child(2)").textContent = `${movie.Year}`;
    movieInfo.querySelector(".rated-year-duration span:nth-child(3)").textContent = `${movie.Runtime}`;
    movieInfo.querySelector(".genre").innerHTML = `<span>${movie.Genre.split(",").join("</span><span>")}`;
    movieInfo.querySelector(".plot p").textContent = `${movie.Plot}`;
    movieInfo.querySelector(".cast p").textContent = `${movie.Actors}`;

    this.result.append(movieInfo);
  }

  removePreviousMovieSearch() {
    this.result.querySelectorAll("#movie").forEach((element) => {
      element.remove();
    });

    const errorMessage = document.querySelector(".error-msg");

    if (errorMessage) {
      errorMessage.remove();
    }
  }
}
