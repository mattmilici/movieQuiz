
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


//Note: Consider randomly selecting pages with each actor/movie question

//Note: Query a different movie if backdrop == null?

//Note: Query a different actor if profile_path == null?


//Object to store movie data

class movieObject {
    constructor(title, id) {
        this.title = title;
        this.id = id;
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

    });
}


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
        }
    });
}


//Sets our filmography array

//AJAX method - https://developers.themoviedb.org/3/people/get-person-movie-credits

function getFilmography(e) {

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
}


function checkAnswer() {



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
    }


}


//For testing response data

//Change between displayMovie and displayActor functions for different game

//------------------------ DELETE THIS LISTENER ---------------------------

//$("body").on("click", displayMovie);


//Switch between filmography and movieCredits



$("#userSubmit").on("click", checkRound);