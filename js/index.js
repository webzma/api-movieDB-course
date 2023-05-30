import API_KEY from './key.js';

const api = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    }
});

async function getTrendingMoviesPreview() {
    const { data } = await api("trending/movie/day");
    const movies = data.results;

    movies.forEach(movie => {
        const containerTrendingMovies = document.querySelector('.trendingPreview-movieList');

        const movieContainer = document.createElement("div");
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.src = 'https://image.tmdb.org/t/p/w300/' + movie.poster_path;

        movieContainer.appendChild(movieImg);

        containerTrendingMovies.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    categories.forEach(category => {
        const containerCategoriesPreview = document.querySelector('.categoriesPreview-list');

        const categoryContainer = document.createElement("div");
        categoryContainer.classList.add('category-container');

        const nameCategory = document.createElement('h3');
        nameCategory.classList.add('category-title');
        nameCategory.id = "id" + category.id;
        nameCategory.textContent = category.name;

        categoryContainer.appendChild(nameCategory);

        containerCategoriesPreview.appendChild(categoryContainer);
    });
}

getTrendingMoviesPreview();
getCategoriesPreview();


