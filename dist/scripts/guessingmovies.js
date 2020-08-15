<<<<<<< HEAD

=======
>>>>>>> 329882e85f9b693e86770254954261197b89b5e1
let movieApi = "a610c6a9537cc833aef3465e46fba9e6";

var currentScore = 0;

//let giphyApi = "1I9K6gwnF2ljgEW2mzK2VdGc4CU7iX8g";
//Globals for guessing movies an actor has been in
var actors;
<<<<<<< HEAD
var actorIndex;
var randomActor;
=======

var actorIndex;

var randomActor;

>>>>>>> 329882e85f9b693e86770254954261197b89b5e1
var filmography = [];


//Globals for guessing an actor in a random movie

var movies;
<<<<<<< HEAD
var randomMovie;
var movieCredits = [];
var userAnswersArray = [];
var moviesObjects = [];
var moviesObjectsIndex = 0;
var actorId;
var round = 0;
var userLives = 3;
var previousComputerQuestions = [];
var start = true;
var movieList = [];
var firstUserInput;
var currentMovieId;
=======

var randomMovie;

var movieCredits = [];

var moviesSeen = [];

var moviesObjects = [];

var moviesObjectsIndex;

var actorId;
>>>>>>> 329882e85f9b693e86770254954261197b89b5e1


//Note: Consider randomly selecting pages with each actor/movie question

//Note: Query a different movie if backdrop == null?

//Note: Query a different actor if profile_path == null?


<<<<<<< HEAD
=======
initGame();

>>>>>>> 329882e85f9b693e86770254954261197b89b5e1
//Object to store movie data

class movieObject {
    constructor(title, id) {
        this.title = title;
        this.id = id;
<<<<<<< HEAD
    }
};





function checkRound() {

    if (round === 0) {
        firstRound();
    } else {
        checkAnswer();
    }
};

function firstRound() {
    var tempmovie = $("#userInput").val();
    

    var roundurl = "https://api.themoviedb.org/3/search/movie?api_key=a610c6a9537cc833aef3465e46fba9e6&language=en-US&query=" + tempmovie + "&page=1&include_adult=false&page=1&include_adult=false";

     $.ajax({
        url: roundurl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        $("#userInput").val("");
        firstUserInput = response.results[0].id;
        chooseNextActor(response.results[0].id);
    });

    round++;

}

//Gets a random page of Actors and stores it in actors array

//AJAX query - https://developers.themoviedb.org/3/people/get-popular-people

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
=======
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
>>>>>>> 329882e85f9b693e86770254954261197b89b5e1

    });

}

<<<<<<< HEAD

function chooseNextActor(id) {

    currentMovieId = id;
    var tempid = id;
    console.log(tempid);
    let movieURL = "https://api.themoviedb.org/3/movie/" + tempid + "/credits?api_key=" + movieApi;

    $.ajax({
        url: movieURL,
        method: "GET"
    }).then(function (response) {
        var movies = response.cast;
        var randnum = Math.floor(Math.random() * (20));
        console.log(response.cast[randnum]);
        displayActor(response.cast[randnum].id);
    });
};

//Renders a random actor's profile picture with response data from getActors()

//AJAX method - https://developers.themoviedb.org/3/people/get-person-details

function displayActor(actorid) {

    let profileURL = "https://api.themoviedb.org/3/person/" + actorid + "?api_key=" + movieApi + "&language=en-US";

    $.ajax({
        url: profileURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        //console.log(response);
        if (response.profile_path && (response.popularity > 2) && (previousComputerQuestions.indexOf(response.name) === -1)) {
            $("#moviePoster").attr("src", "https://image.tmdb.org/t/p/w500/" + response.profile_path);
            $("#computerSubmision").text(response.name);
            //console.log("random actor id ");
            //console.log(randomActor.id);
            getFilmography(response.id);
            previousComputerQuestions.push(response.name);
        } else if (round > 1) {
            chooseNextActor(currentMovieId);
        } 
        else if (round === 1) {
            console.log("first user input was recalled");
            chooseNextActor(firstUserInput);
        } else{
            console.log("stuck");
=======
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
        if (response.profile_path && (response.popularity > 10)) {
            $("#moviePoster").attr("src", "https://image.tmdb.org/t/p/w500/" + response.profile_path);
            $("#computerSubmision").text(response.name);
            console.log("random actor id ");
            console.log(randomActor.id);
            getFilmography(response.id);
        }
        else {
            chooseNextActor(actorId);
>>>>>>> 329882e85f9b693e86770254954261197b89b5e1
        }


    });


}

<<<<<<< HEAD

=======

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


>>>>>>> 329882e85f9b693e86770254954261197b89b5e1
//Sets our filmography array

//AJAX method - https://developers.themoviedb.org/3/people/get-person-movie-credits

function getFilmography(e) {

<<<<<<< HEAD
    //console.log("e ", e);
    filmography.length = 0;
    moviesObjects = [];
    movieList = [];

    let creditURL = "https://api.themoviedb.org/3/person/" + e + "/movie_credits?api_key=" + movieApi + "&language=en-US";
    $.ajax({
        url: creditURL,
        method: "GET"
    }).then(function (response) {
        response.cast.forEach(function (item) {
            filmography.push(item.original_title);
        })
        for (var i = 0; i < response.cast.length; i++) {
            moviesObjects[i] = [new movieObject(response.cast[i].original_title, response.cast[i].id)];
            movieList.push(response.cast[i].original_title);
        }
        //console.log(response);
        console.log(movieList);
    })
=======
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

>>>>>>> 329882e85f9b693e86770254954261197b89b5e1
}


function checkAnswer() {


<<<<<<< HEAD

    for (var q = 0; q < moviesObjects.length; q++) {
        movieCredits.push(moviesObjects[q][0].title);
        if (userInput === moviesObjects[q][0].title) {
            console.log("success");
            moviesObjectsIndex = q;
        }
    }
    // gets the users current input
    userInput = $("#userInput").val(); // checks to make sure that it is not on the array of answers by making sure this function returns a -1
    var repeatAnswer = userAnswersArray.indexOf(userInput);
    // checks to make sure that the actor is on the array of answers by making sure this function does not return -1
    var answerCheck = movieCredits.indexOf(userInput);
    // console.log(repeatAnswer);
    // console.log(answerCheck);
    if (answerCheck !== -1 && repeatAnswer === -1) {
        userAnswersArray.push(userInput);
        //Adds 1 to the user Score
        currentScore++;
        $("#userCurrentScore").text(currentScore);
        $("#userInput").val("");
        //Runs the first round script again
        chooseNextActor(moviesObjects[moviesObjectsIndex][0].id);
        //Clears user text input
        // $("#userInput").val("");
        round++;
        moviesObjectsIndex = 0;
    } else if (userLives > 1) {
        $("#computerSubmision").text(
            "Nope! You now have " + (userLives - 1) + " lives left"
        );
        $("#life" + userLives).hide();
        userLives--;
        //Clears user text input
        $("#userInput").val("");
    } else {
        //Tells the user they were wrong and asks them to restart by typing a name. Also removes the movie poster
        $("#computerSubmision").text(
            "incorrect you lose! Enter a name below to restart!"
        );
        $("#moviePoster").attr("src", ""); //Clears out users data
        userAnswersArray = [];
        ComputerMovieIdArray = [];
        //updates highscore if the users current game is better
        let userHighScore = parseInt($("#userHighScore").text());
        let userCurrentScore = parseInt($("#userCurrentScore").text());
        if (userCurrentScore > userHighScore) {
            $("#userHighScore").text(userCurrentScore);
        }
        $("#life1").hide(); //Sets current score equal to zero again
        currentScore = 0;
        $("#userCurrentScore").text(currentScore);
        //Clears user text input
        $("#userInput").val("");
        userAnswersArray = [];
        movieCredits = [];
=======
    let keys = movieCredits;

    let userInput = $("#userTextField").find("input").val();

    var flag = false;

    //console.log(keys);

    //console.log(keys.indexOf(userInput) > 0);

    console.log(moviesObjects);

    for (var q = 0; q < moviesObjects.length; q++) {
        if (userInput.toLowerCase() === moviesObjects[q][0].title.toLowerCase()) {
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
>>>>>>> 329882e85f9b693e86770254954261197b89b5e1
    }


}

<<<<<<< HEAD
=======
function clearString(q) {

};

>>>>>>> 329882e85f9b693e86770254954261197b89b5e1

//For testing response data

//Change between displayMovie and displayActor functions for different game

//------------------------ DELETE THIS LISTENER ---------------------------

//$("body").on("click", displayMovie);


//Switch between filmography and movieCredits

<<<<<<< HEAD


$("#userSubmit").on("click", checkRound);
=======
$("#userSubmit").on("click", checkAnswer);
>>>>>>> 329882e85f9b693e86770254954261197b89b5e1
