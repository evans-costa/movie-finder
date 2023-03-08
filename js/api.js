const API_KEY = "fb1e69f1";

export class MovieApi {
  static async search(movieName) {
    const endpoint = `http://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}`;

    const data = await fetch(endpoint);
    const { Title, Year, Rated, Runtime, Genre, Plot, Poster, imdbRating, Actors } = await data.json();

    return {
      Title,
      Year,
      Rated,
      Year,
      Runtime,
      Genre,
      Plot,
      Poster,
      imdbRating,
      Actors,
    };
  }
}
