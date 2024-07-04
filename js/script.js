"use strict";

const cardWrapper = $('#cards');
const srchInput = $('#srch-input');
const perfectSearchFilm = $('#perfect-search-film');
const perfectRatingFilm = $('#perfect-rating-film');
const perfectGenreFilm = $('#perfect-genre-film');
const perfectSearch = $('#perfect-search');
const likeCount = $('#like-count');
const addLike = $('#add-like');
const allMovies = $('#all-movies');

const data = movies.splice(0, 100);


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


// RENDER DATA

function renderData(data) {
    cardWrapper.innerHTML = `<div class="loader absolute top-[450px] left-[50%]"></div>`

    setTimeout(() => {
        cardWrapper.innerHTML = '';
        const likedList = JSON.parse(localStorage.getItem('liked-list')) || [];

        if (data.length) {
            data?.forEach(el => {
                const card = createElement('div', 'card shadow-2xl hover:translate-y-[-10px] duration-300 w-[330px] border-2 border-white', `
                    <img src="${el.imgMax}" class="w-full h-[45%]" alt="smth">
                    
                    <div class="mx-2 pl-2">
                        <h2 class="text-xl">${el.title.substring(0, 24)}...</h2> 
                        <ul>
                            <li>
                                <strong>Year: </strong><span>${el.year}</span>
                            </li>
                            <li>
                                <strong>Genre: </strong><span>${el.genres.join(", ")}</span>
                            </li>
                            <li>
                                <strong>Rating: </strong><span>${el.rating}</span>
                            </li>
                            <li>
                                <strong>Language: </strong><span>${el.language}</span>
                            </li>
                            <li>
                                <strong>Time: </strong><span>${el.time}</span>
                            </li>    

                            <div class="flex items-center gap-x-10"><button id="watch-movie" data-id="${el.id}" class="mt-2">Watch a movie</button> <span id="add-like" data-like="${el.id}"><i data-like="${el.id}" id="like" class='bx ${likedList.includes(el.id) ? 'bxs-heart' : 'bx-heart'} text-2xl text-red-500 hover:scale-150 duration-300 cursor-pointer' ></i></span></div>
                        </ul>
                    </div>
                    `)

                cardWrapper.append(card)
            })
        } else {
            cardWrapper.innerHTML = `
                    <p><span class="fancy absolute top-[450px] left-[40%]">NOT FOUND!</span></p>
                    `
        }
    }, 2000)
}
renderData(normalize)


// ALL MOVIES

allMovies.addEventListener("click", () => {
    renderData(normalize);
});


// SEARCH

srchInput.addEventListener('keyup', () => {
    const value = srchInput.value.toLowerCase();
    const filteredData = normalize.filter(el => el.title.toLowerCase().includes(value));
    renderData(filteredData)
})


// RENDER OPTIONS

const genres = [];

function renderOptions(data) {
    data.forEach(movie => {
        movie.genres.forEach(genre => {
            if (!genres.includes(genre)) {
                genres.push(genre);
                genres.sort()
            }
        })
    })

    genres.forEach(genre => {
        const option = createElement('option', 'option-item', genre);
        perfectGenreFilm.append(option)
    });
}
renderOptions(normalize)


// PERFECT SEARCH

function perfectSrch(data) {
    const valueRating = Math.floor(Number(perfectRatingFilm.value))

    const newData = data.filter(el => el.title.toLowerCase().includes(perfectSearchFilm.value.toLowerCase()) && el.genres.includes(perfectGenreFilm.value) && valueRating <= Number(el.rating));
    renderData(newData);
}

// perfectSearch.addEventListener('submit', e => {
//     e.preventDefault();

//     perfectSrch(normalize);
// })

perfectSearch.onsubmit = (e) => {
    e.preventDefault();

    perfectSrch(normalize);
}


// EVENT DELEGATION

cardWrapper.addEventListener('click', e => {

    // VIEW MOVIE

    if (e.target.getAttribute("id") === "watch-movie" && e.target.nodeName === "BUTTON") {
        const id = e.target.getAttribute("data-id");
        localStorage.setItem("movieID", id);
        window.location.href = "./film.html"
    }

    // ADD LIKE

    if (e.target.getAttribute("id") === "add-like" && e.target.nodeName === "SPAN" || e.target.getAttribute("id") === "like") {
        let likedList = JSON.parse(localStorage.getItem("liked-list")) || [];
        const id = e.target.getAttribute("data-like");
        if (!likedList.includes(id)) {
            likedList.push(id);
            localStorage.setItem("liked-list", JSON.stringify(likedList));
            e.target.classList.remove("bx-heart")
            e.target.classList.add("bxs-heart");
            likeCounter();
        } else {
            likedList = likedList.filter(item => item!== id);
            localStorage.setItem("liked-list", JSON.stringify(likedList));
            e.target.classList.remove("bxs-heart")
            e.target.classList.add("bx-heart");
            likeCounter();
        }
    }

});


// LIKE COUNTER

function likeCounter() {
    let likedList = JSON.parse(localStorage.getItem("liked-list")) || [];
    likeCount.innerHTML = `<i class='bx bx-heart-circle text-[32px] text-red-500'></i> <h2>${likedList.length}</h2>`;
}

likeCounter();


// RENDER LIKED LIST

let films = [];

likeCount.addEventListener("click", () => {
    const likedList = JSON.parse(localStorage.getItem("liked-list")) || [];
    console.log(likedList);

    films = likedList.map(id => normalize.find(el => el.id === id)).filter(Boolean);

    renderData(films);
});







