//
// var trialMovies = ["Anchorman, Memento, Space Jam, Django, Ocean's 11"];
// var userInput;
// var currentMovie;
// var currentActor;
// var userMovie;
// var userActor;
// //plan on making this function more robust, for now just going to be using it to input data already availible in html file
// initGame();
// function initGame() {
//     currentMovie = "Anchorman";
//     currentActor = "Will Ferrell";
//     setQuestion("Will Ferrel");
//     getActorId(currentActor);

// };

// function setPoster() {

//     var temp = currentMovie.replace(" ","&20");
//     $.ajax({
//         url: "https://api.themoviedb.org/3/search/movie?api_key=" + api + "&language=en-US&query=" + temp + "&page=1&include_adult=false",
//         method: "GET"
//     }).then(function(result){

//         console.log(result);
//         $("#moviePoster").attr("src", "https://image.tmdb.org/t/p/w500" + result.results[0].poster_path);
//     });

// };

// function setQuestion(input) {

//     setPoster();
//     $("#computerSubmision").text(currentMovie.toUpperCase());
// };

// $("#userSubmit").on("click", function () {
//     userInput = $("#userInput").val();
//     console.log(userInput);

//     getAnotherMovie();
//     setQuestion();
// });

// function getActorId(actor) {
//     $.ajax({
//         url: "https://api.themoviedb.org/3/search/person?api_key=" + api + "&language=en-US&query=" + actor + "&page=1&include_adult=false",
//         method: "GET"
//     }).then(function (e) {
//         currentActorId = e.results[0].id;
//         //console.log(e);
//     });
// }

// function getAnotherMovie() {

//     var getPerson = "https://api.themoviedb.org/3/search/person?api_key=" + api + "&language=en-US&query=" + currentActor + "&page=1&include_adult=false";
//     var tempactor = userInput.toLowerCase();
//   $.ajax({
//     url: getPerson,
//     method: "GET",
//   }).then( (res) => {

//     var personId = 0;
//     for (let actorGetIndex = 0; actorGetIndex < res.results.length; actorGetIndex++) {
//       console.log("result actor " + res.results[actorGetIndex].name);
//       if (tempactor === res.results[actorGetIndex].name.toLowerCase()) {
//         personId = res.results[actorGetIndex].id;
//       }
//     }
//     let getMovieCredits = "https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=" + api + "&language=en-US";

//     $.ajax({
//       url: getMovieCredits,
//       method: "GET",
//     }).then( (movieResults) => {
//         console.log(tempactor);
//         console.log(movieResults);
//     })
//   });
// }

//This function takes the actor the user inputs and pulls back a random movie they have been in. It will update the movietitle and image in the html.

var currentActorId;
var movieID;
var movieCastMember;
var MovieCastArray = [];
var currentScore = 0;
var startRunningScripts = false;
var previousMoviesList = [];
var currentMovieIndex = 0;

$("#userSubmit").on("click", standardGame);

function standardGame() {
    var movieArrayLength = MovieCastArray.length;

    if (movieArrayLength === 0) {
        userInput = $("#userInput").val();
        firstRound();
    }
    if (movieArrayLength !== 0) {
        userInput = $("#userInput").val();
        secondRoundForward();
    }
}

function firstRound() {
    userInput = $("#userInput").val();
    $.ajax({
        url: "https://api.themoviedb.org/3/search/person?api_key=a610c6a9537cc833aef3465e46fba9e6&language=en-US&query=" +
            userInput +
            "&page=1&include_adult=false",
        method: "GET",
    }).then(function(e) {
        //setting a random movie title on screen. This represents the computers answers and will always be a movie the actor was in.
        var randomNumber = Math.floor(Math.random() * 3);
        var movieTitle = e.results[0].known_for[randomNumber].original_title;
        //Adds new movie to HTML
        $("#computerSubmision").text(movieTitle);
        console.log(e);

        //Grabs the poster for the movie generated above and displays it on screen.
        var moviePoster = e.results[0].known_for[randomNumber].poster_path;
        //Adds new movie Poster Image to HTML
        $("#moviePoster").attr(
            "src",
            "https://image.tmdb.org/t/p/w500" + moviePoster
        );

        //this gets a list of Actors that were in the movie
        movieID = e.results[0].known_for[randomNumber].id;

        var queryLink =
            "https://api.themoviedb.org/3/movie/" +
            movieID +
            "/credits?api_key=a610c6a9537cc833aef3465e46fba9e6&page=1&include_adult=false";
        $.ajax({
            url: queryLink,
            method: "GET",
        }).then(function(result) {
            //this provides the first 20 actors listed on the cast sheet. We can increase this if needed.
            MovieCastArray = [];
            for (let i = 0; i < 40; i++) {
                movieCastMember = result.cast[i].name;
                MovieCastArray.push(movieCastMember);
            }
            var MovieCastArrayPop = MovieCastArray.indexOf(userInput);
            MovieCastArray.splice(MovieCastArrayPop, 1);

            $("#actor1").text(MovieCastArray[0]);
            $("#actor2").text(MovieCastArray[1]);
            $("#actor3").text(MovieCastArray[2]);
            $("#actor4").text(MovieCastArray[3]);
        });
        $("#userInput").val("");
    });
}

function secondRoundForward() {
    userInput = $("#userInput").val();
    var answerCheck = MovieCastArray.indexOf(userInput);

    if (answerCheck !== -1) {
        firstRound();
        currentScore++;
        $("#userCurrentScore").text(currentScore);
        console.log("it's working");
        $("#userInput").val("");
        $("#actor1").text(MovieCastArray[0]);
        $("#actor2").text(MovieCastArray[1]);
        $("#actor3").text(MovieCastArray[2]);
        $("#actor4").text(MovieCastArray[3]);
    } else {
        $("#computerSubmision").text("incorrect you lose!");
        console.log(MovieCastArray);
    }
}