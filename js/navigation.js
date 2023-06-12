searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value.replace(" ", "-");
});

trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

arrowBtn.addEventListener("click", () => {
  history.back();
});

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendPage();
  } else if (location.hash.startsWith("#search")) {
    searchPage();
  } else if (location.hash.startsWith("#category")) {
    categoriesPage();
  } else if (location.hash.startsWith("#movie")) {
    movieDetailsPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function homePage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function movieDetailsPage() {
  headerSection.classList.add("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [_, movieId] = location.hash.split("=");

  getMovieById(movieId);
}

function categoriesPage() {
  headerSection.classList.remove("header-container--long");
  /* headerSection.style.background = ''; */
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--whitea");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");
  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, categoryInfo] = location.hash.split("=");
  const [categoryId, categoryName] = categoryInfo.split("-");

  getMoviesByCategory(categoryId, categoryName);
}

function trendPage() {
  headerSection.classList.remove("header-container--long");
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--whitea");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.remove("inactive");

  headerCategoryTitle.textContent = "Trending Movies";

  searchForm.classList.add("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMovies();
}

function searchPage() {
  headerSection.classList.remove("header-container--long");
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--whitea");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [_, query] = location.hash.split("=");

  getMoviesByQuery(query);
}

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
