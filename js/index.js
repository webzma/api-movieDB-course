const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;
  createMovies(movies, trendingMoviesPreviewList);
}

async function getCategoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;

  createCategory(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id, categoryName) {
  const { data } = await api("discover/movie/", {
    params: {
      with_genres: id,
    },
  });
  const moviesByCategory = data.results;
  headerCategoryTitle.textContent = categoryName;
  createMovies(moviesByCategory, genericSection);
}

async function getMoviesByQuery(query) {
  const { data } = await api("search/movie", {
    params: {
      query,
    },
  });

  console.log(data);

  const moviesByQuery = data.results;
  createMovies(moviesByQuery, genericSection);
}

async function getTrendingMovies() {
  const { data } = await api("trending/movie/day");
  const trendingMovies = data.results;

  createMovies(trendingMovies, genericSection);
}

async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);

  const movieImageUrl = "https://image.tmdb.org/t/p/w500/" + movie.poster_path;
  headerSection.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),url(${movieImageUrl})`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  createCategory(movie.genres, movieDetailCategoriesList);
  getRelatedMoviesById(movie.id);
}

async function getRelatedMoviesById(id) {
  const { data: movies } = await api("movie/" + id + "/recommendations");
  createMovies(movies.results, relatedMoviesContainer);
}

//UTILS
function createMovies(movies, container) {
  container.innerHTML = "";
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.src = "https://image.tmdb.org/t/p/w300/" + movie.poster_path;

    movieContainer.appendChild(movieImg);

    container.appendChild(movieContainer);
  });
}

function createCategory(categories, container) {
  container.innerHTML = "";

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    const nameCategory = document.createElement("p");

    categoryContainer.classList.add("category-container");
    nameCategory.classList.add("category-title");
    nameCategory.id = "id" + category.id;
    nameCategory.textContent = category.name;

    nameCategory.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });

    categoryContainer.appendChild(nameCategory);

    container.appendChild(categoryContainer);
  });
}
