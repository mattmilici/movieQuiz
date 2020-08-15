let movieApi = "a610c6a9537cc833aef3465e46fba9e6";

var currentScore = 0;

//let giphyApi = "1I9K6gwnF2ljgEW2mzK2VdGc4CU7iX8g";
//Globals for guessing movies an actor has been in
var actors;

var actorIndex;

var randomActor;

var filmography = [];


//Globals for guessing an actor in a random movie

var movies;

var randomMovie;

var movieCredits = [];

var moviesSeen = [];

var moviesObjects = [];

var moviesObjectsIndex;

var actorId;


//Note: Consider randomly selecting pages with each actor/movie question

//Note: Query a different movie if backdrop == null?

//Note: Query a different actor if profile_path == null?


initGame();

//Object to store movie data

class movieObject {
    constructor(title, id) {
        this.title = title;
        this.id = id;
    }
};


//Gets a random page of Actors and stores it in actors array

//AJAX query - https://developers.themoviedb.org/3/people/get-popular-people

function initGame() {
    getRandomActors();
};

function getRandomActors() {

    let randomPage = Math.floor(Math.random() * 10 + 1);

    let actorURL = "https://api.themoviedb.org/3/person/popular?api_key=a610c6a9537cc833aef3465e46fba9e6&language=en-US&page=" + randomPage;


    $.ajax({
        url: actorURL,
        method: "GET"
    }).then(function (response) {
        //console.log(response);

        actors = response.results;


        //Comment this out if you're displaying movies in getMoves()

        actorIndex = Math.floor(Math.random() * (actors.length - 1));

        randomActor = actors[Math.floor(Math.random() * (actors.length - 1))];

        actorId = randomActor.id;

        displayActor(actorId);

    });

}

//Gets a random page of movies and stores it in movies array

//AJAX query - https://developers.themoviedb.org/3/discover/movie-discover

function getMovies() {


    let randomPage = Math.floor(Math.random() * 5) + 1;

    //console.log(randomPage);

    let movieURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + movieApi + "&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + randomPage + "&primary_release_year=1990";


    $.ajax({

        url: movieURL,

        method: "GET"

    }).then(function (response) {


        //console.log(response);

        movies = response.results;


        //Comment this out if you're displaying Actors in getActors()

        //displayMovie();

    });

}

function chooseNextActor(id) {

    var tempid = moviesObjects[moviesObjectsIndex][0].id;
    console.log(tempid);

    let movieURL = "https://api.themoviedb.org/3/movie/" + tempid + "/credits?api_key=" + movieApi;

    $.ajax({

        url: movieURL,

        method: "GET"

    }).then(function (response) {

        var movies = response.cast;
        var randnum = Math.floor(Math.random() * (movies.length - 1));
        console.log(response.cast[randnum]);
        displayActor(response.cast[randnum].id);




    });
};


//Renders a random actor's profile picture with response data from getActors()

//AJAX method - https://developers.themoviedb.org/3/people/get-person-details

function displayActor(actorid) {




    //console.log(randomActor.id);

    let profileURL = "https://api.themoviedb.org/3/person/" + actorid + "?api_key=" + movieApi + "&language=en-US";


    $.ajax({

        url: profileURL,

        method: "GET"

    }).then(function (response) {


        console.log(response);

        //console.log(response);
        if (response.profile_path && (response.popularity > 8)) {
            $("#moviePoster").attr("src", "https://image.tmdb.org/t/p/w500/" + response.profile_path);
            $("#computerSubmision").text(response.name);
            console.log("random actor id ");
            console.log(randomActor.id);
            getFilmography(response.id);
        }
        else {
            chooseNextActor(actorId);
        }


    });


}


//Renders a random movie's backdrop with response data from getMovies()

//AJAX method - https://developers.themoviedb.org/3/movies/get-movie-credits 

function displayMovie() {


    randomMovie = movies[Math.floor(Math.random() * (movies.length - 1))];

    //console.log(randomMovie);


    $("#img-display").attr("src", "https://image.tmdb.org/t/p/w500/" + randomMovie.backdrop_path);

    $("#movie-name").text(randomMovie.original_title);


    movieCredits.length = 0;

    let creditsURL = "https://api.themoviedb.org/3/movie/" + randomMovie.id + "/credits?api_key=" + movieApi;


    $.ajax({

        url: creditsURL,

        method: "GET"

    }).then(function (response) {


        response.cast.forEach(function (item) {

            movieCredits.push(item.name);

        })


        //console.log(response);

        //console.log(movieCredits);

    });

}


//Sets our filmography array

//AJAX method - https://developers.themoviedb.org/3/people/get-person-movie-credits

function getFilmography(e) {

    console.log("e ",e);
    filmography.length = 0;

    moviesObjects = [];

    let creditURL = "https://api.themoviedb.org/3/person/" + e + "/movie_credits?api_key=" + movieApi + "&language=en-US";


    $.ajax({

        url: creditURL,

        method: "GET"

    }).then(function (response) {

        console.log("this is running");

        response.cast.forEach(function (item) {

            filmography.push(item.original_title);


        })

        console.log(response);

        for (var i = 0; i < response.cast.length; i++) {
            moviesObjects[i] = [new movieObject(response.cast[i].original_title, response.cast[i].id)];
            //console.log(moviesObjects[i][0]);
        }


        //console.log(response);

        //console.log(filmography);

    })

}


function checkAnswer() {


    let keys = movieCredits;

    let userInput = $("#userTextField").find("input").val();

    var flag = false;

    //console.log(keys);

    //console.log(keys.indexOf(userInput) > 0);

    console.log(moviesObjects);

    for (var q = 0; q < moviesObjects.length; q++) {
        if (userInput === moviesObjects[q][0].title) {
            console.log("success");
            moviesObjectsIndex = q;
            currentScore++;
            $("#userCurrentScore").text(currentScore);
            $("#userInput").val("");
            flag = true;
            break;
        }

    }
    console.log("flag: " + flag);
    if (flag) {
        chooseNextActor(moviesObjects[moviesObjectsIndex][0].id);
    } else {
        //put losing code here
    }


}


//For testing response data

//Change between displayMovie and displayActor functions for different game

//------------------------ DELETE THIS LISTENER ---------------------------

//$("body").on("click", displayMovie);


//Switch between filmography and movieCredits

$("#userSubmit").on("click", checkAnswer);