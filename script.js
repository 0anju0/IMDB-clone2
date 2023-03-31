// Titles: https://omdbapi.com/?s=thor&page=1&apikey=dc9522de
// details: http://www.omdbapi.com/?i=tt3896198&apikey=dc9522de
console.log('js file added');
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const resultfav= document.getElementById('result-fav');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=dc9522de`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

// find movies which we search
function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}


// display the Movie Details in front end
function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>

        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}


// load movies
function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=dc9522de`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
        });
    });
}


// display Movie Details with some feature
function displayMovieDetails(details){
    
        resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
        <botton class="fancy" id="fav">
            <span class="top-key" ></span>
            <span class="text">Add to Favourites</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
        </button>
    </div>
    `;

    

    // var count = 0;
    // add button to add it in favorites
    const button = document.getElementById('fav');
    button.addEventListener("click", function(){
        var index = localStorage.length;
        var data = JSON.stringify(details);
        localStorage.setItem(details.id,data);
        resultfav.innerHTML += `
        <div style="margin: 41px 0;">
        <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
        </div>
        <div class = "movie-info">
            <h3 class = "movie-title">${details.Title}</h3>
            <ul class = "movie-misc-info">
            <li class = "year">Year: ${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
            </ul>
            <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
            <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
            <p class = "actors"><b>Actors: </b>${details.Actors}</p>
            <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
            <p class = "language"><b>Language:</b> ${details.Language}</p>
            <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
            <a class="fancy" href="#" >
            <span class="top-key"></span>
            <span class="text">Add to Favourites</span>
            <span class="bottom-key-1"></span>
            <span class="bottom-key-2"></span>
            </a>
            </div>
            </div>
            `;
    });

    
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});