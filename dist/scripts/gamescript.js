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
var userAnswersArray = [];
var ComputerMovieIdArray = [];

$("#userSubmit").on("click", standardGame);

function standardGame() {
    var movieArrayLength = MovieCastArray.length;
    if (movieArrayLength === 0) {
        firstRound();
    }
    if (movieArrayLength !== 0) {
        secondRoundForward();
    }
}

function firstRound() {
    //creates an array of user answers. This is how we can make sure the user doesn't enter the same actor twice in one game
    userInput = $("#userInput").val();
    userAnswersArray.push(userInput);

    //call request from movie API
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
            //this provides the first 40 actors listed on the cast sheet. We can increase this if needed.
            MovieCastArray = [];
            for (let i = 0; i < 40; i++) {
                movieCastMember = result.cast[i].name;
                MovieCastArray.push(movieCastMember);
            }
            //this removes the actor the user just entered so they can't use it twice
            var MovieCastArrayPop = MovieCastArray.indexOf(userInput);
            MovieCastArray.splice(MovieCastArrayPop, 1);

            $("#actor1").text(MovieCastArray[0]);
            $("#actor2").text(MovieCastArray[1]);
            $("#actor3").text(MovieCastArray[2]);
            $("#actor4").text(MovieCastArray[3]);
        });
        //Clears user text input
        $("#userInput").val("");
    });
}

function secondRoundForward() {
    // gets the users current input
    userInput = $("#userInput").val();
    // checks to make sure that it is not on the array of answers by making sure this function returns a -1
    var repeatAnswer = userAnswersArray.indexOf(userInput);
    // checks to make sure that the actor is on the array of answers by making sure this function does not return -1
    var answerCheck = MovieCastArray.indexOf(userInput);
    console.log(repeatAnswer);
    console.log(userAnswersArray);
    if (answerCheck !== -1 && repeatAnswer === -1) {
        //Runs the first round script again
        firstRound();

        //Adds 1 to the user Score
        currentScore++;
        $("#userCurrentScore").text(currentScore);

        //Clears user text input
        $("#userInput").val("");

        //Provides the first 4 actors in the movie. We will need to add a script that adds actors not in the movie
        $("#actor1").text(MovieCastArray[0]);
        $("#actor2").text(MovieCastArray[1]);
        $("#actor3").text(MovieCastArray[2]);
        $("#actor4").text(MovieCastArray[3]);
    } else {
        //Tells the user they were wrong and asks them to restart by typing a name. Also removes the movie poster
        $("#computerSubmision").text(
            "incorrect you lose! Enter a name below to restart!"
        );
        $("#moviePoster").attr("src", "");

        //updates highscore if the users current game is better
        let userHighScore = parseInt($("#userHighScore").text());
        let userCurrentScore = parseInt($("#userCurrentScore").text());
        if (userCurrentScore > userHighScore) {
            $("#userHighScore").text(userCurrentScore);
        }

        //Sets current score equal to zero again
        currentScore = 0;
        $("#userCurrentScore").text(currentScore);
        //Clears user text input
        $("#userInput").val("");
        userAnswersArray = [];
        MovieCastArray = [];
    }
}