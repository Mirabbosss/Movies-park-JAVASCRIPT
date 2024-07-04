"use strict";

const data = movies.splice(0, 100);
const movieID = localStorage.getItem('movieID');

const filmWrapper = $('#film-wrapper');

// NORMALIZE

const normalize = data.map(el => {
    return {
        title: el.title,
        year: el.year,
        genres: el.categories,
        id: el.imdbId,
        rating: el.imdbRating,
        time: `${Math.floor(el.runtime / 60)}h ${el.runtime % 60}m`,
        language: el.language,
        youtube: `https://youtube.com/embed/${el.youtubeId}`,
        summary: el.summary,
        imgMax: el.bigThumbnail,
        imgMin: el.smallThumbnail
    }
})

// FIND FILM BY ID

function findFilmById(filmID) {
    return normalize.filter(film => film.id === filmID)[0];
}

const findedFilm = findFilmById(movieID);

// RENDER FINDED FILM

function renderFindedFilm(film) {
    filmWrapper.innerHTML = `
    <iframe id="film" width="100%" height="600px" src="${film.youtube}"
                        title="YouTube video player" frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

                    <ul class="p-5 text-xl text-white">
                        <li>
                            <strong>Film: </strong> <span>${film.title}</span>
                        </li>

                        <li>
                            <strong>Year: </strong><span>${film.year}</span>
                        </li>

                        <li>
                            <strong>Genre: </strong><span>${film.genres.join(", ")}</span>
                        </li>

                        <li>
                            <strong>Rating: </strong><span>${film.rating}</span>
                        </li>

                        <li>
                            <strong>Language: </strong><span>${film.language}</span>
                        </li>

                        <li>
                            <strong>Time: </strong><span>${film.time}</span>
                        </li>
                    </ul>

                    <div class="pl-5 pb-5 text-xl text-white">
                        <a href="./index.html">
                            <button>All films</button>
                        </a>

                        <button id="delete-film">Delete from liked</button>
                    </div>
    `
};

renderFindedFilm(findedFilm);


// DELETE FILM FROM LIKED

$('#delete-film').addEventListener('click', () => {
    let likedList = JSON.parse(localStorage.getItem("liked-list")) || [];
    const movieID = localStorage.getItem("movieID");

    let question = confirm(`Are you sure you want to delete?`);

    if (question) {
        likedList = likedList.filter(id => id !== movieID);
        localStorage.setItem("liked-list", JSON.stringify(likedList));
        alert("Successfully deleted movie")
    } else {
        alert("Movie was not deleted")
    }
})




