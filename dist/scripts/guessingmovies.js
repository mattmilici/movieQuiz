//everything is working at this pointvar startRunningScripts = false;
var MovieCastArray = [];
var userAnswersArray = [];
var ComputerMovieIdArray = [];
var giphyAPI = "1I9K6gwnF2ljgEW2mzK2VdGc4CU7iX8g";
var apiKey = "api_key=a610c6a9537cc833aef3465e46fba9e6&language=en-US&query";
var apiDomain = "https://api.themoviedb.org/3/"; //score related items
var remainingLife = 3;
var currentScore = 0; //Button Pressed by user to submit an answer
$("#userSubmit").on("click", standardGame); //StandardGame function is what determines if the first or second round script should run. If the movie cast array equals zero, then computer knows to run the firstRound Script which will not provide any points. The seconds round script will run after that and check to make sure the user isn't inputting the same actor twice. It also adds points to the current score.
function standardGame() {
    var movieArrayLength = MovieCastArray.length;
    if (movieArrayLength === 0) {
        var userInput = $("#userInput").val();
        userAnswersArray.push(userInput);
        remainingLife = 3;

        $("#startingText").text("Enter an actor that is in this Movie:");
        $("#life1").show();
        $("#life2").show();
        $("#life3").show();
        $("#WhyYouLost").text("");
        firstRound();
    }
    if (movieArrayLength !== 0) {
        secondRoundForward();
        // // console.log(userAnswersArray);
    }
} //firstRoundScript takes the users input and generate a movie they've been in based off of the actors ID. We then run the getListMoviesFromActorID to ger a list of the movies the actors been in.
function firstRound() {
    //creates an array of user answers. This is how we can make sure the user doesn't enter the same actor twice in one game
    userInput = $("#userInput").val();
    // userAnswersArray.push(userInput);
    // // // console.log(userAnswersArray);
    //call request from movie API

    let movieURL = "https://api.themoviedb.org/3/search/movie?api_key=a610c6a9537cc833aef3465e46fba9e6&language=en-US&query=" + userInput + "&page=1&include_adult=false&page=1&include_adult=false";

    $.ajax({
        url: movieURL,
        method: "GET"
    }).then(function (response) {
        var movies = response.cast;
        // // console.log(response.results);
        getListOfActorsFromMovieID(response.results[0].id);
    });
}

function getListOfActorsFromMovieID(movieIdNumber) {
    // // // console.log(actorIdNumber);
    //Takes the actors ID and finds all the movies they've been in.
    $.ajax({
        url: apiDomain +
            "movie/" +
            movieIdNumber +
            "/credits?" +
            apiKey +
            "&language=en-US",
        method: "GET",
    }).then(function (actorList) {
        //setting a random movie title on screen. This represents the computers answers and will always be a movie the actor was in.
        // // console.log(actorList);
        var randomNumber = Math.floor(Math.random() * 5);
        // // console.log(randomNumber);
        var movieCastArrayLength = actorList.cast.length - 1;
        if (randomNumber > movieCastArrayLength) {
            firstRound();
        }
        var actorName = actorList.cast[randomNumber].name;
        var actorPoster = actorList.cast[randomNumber].profile_path;
        //// // console.log(MovieRepeatCheck); //Grabs the poster for the movie generated above and displays it on screen.        //this gets a list of Actors that were in the movie
        var actorID = actorList.cast[randomNumber].id;
        var MovieRepeatCheck = ComputerMovieIdArray.indexOf(actorID);
        if (movieCastArrayLength === 0 && MovieRepeatCheck !== -1) {
            userWins();
        } else if (
            MovieRepeatCheck !== -1 ||
            actorPoster === null ||
            actorName === undefined ||
            actorID === -1
        ) {
            // // // console.log("true");
            firstRound();
        } else {
            ComputerMovieIdArray.push(actorID);
            // // console.log(ComputerMovieIdArray);
            // Adds new movie Poster Image to HTML
            // // console.log(moviePoster);
            $("#moviePoster").attr(
                "src",
                "https://image.tmdb.org/t/p/w500" + actorPoster
            );
            $("#moviePoster").effect(
                "slide", "show", "slow"
            );
            $("#computerSubmision").text(actorName);
            // // console.log("there is a actor name");
            getListofMovies(actorID);
        }
    });
}

function userWins() {
    $("#computerSubmision").text(
        "Dang! I can't think of anything.... you win! Enter a another actors name to play again!"
    );
    currentScore = 0;
    $("#userCurrentScore").text(currentScore);
    //Clears user text input
    $("#userInput").val("");
    userAnswersArray = [];
    MovieCastArray = [];
}

function getListofMovies(actorId) {
    $.ajax({
        url: apiDomain +
            "person/" +
            actorId +
            "/credits?" +
            apiKey +
            "&page=1&include_adult=false",
        method: "GET",
    }).then(function (result) {
        //this provides the first 40 actors listed on the cast sheet. We can increase this if needed.
        MovieCastArray = [];
        // // console.log("its here");
        // // console.log(result);
        for (let i = 0; i < result.cast.length; i++) {
            var movieCastMember = result.cast[i].original_title;
            MovieCastArray.push(movieCastMember);
        }
        //this removes the actor the user just entered so they can't use it twice
        var MovieCastArrayPop = MovieCastArray.indexOf(userInput);
        MovieCastArray.splice(MovieCastArrayPop, 1);
        // // console.log(MovieCastArray);
        //Clears user text input
        $("#userInput").val("");
    });
}

var answer;

function secondRoundForward() {
    // // console.log(userInput);
    check = $("#userInput").val();
    // gets the users current input
    if (check !== "") {
        userInput = $("#userInput").val();
    }
    // // console.log(userInput);
    // checks to make sure that it is not on the array of answers by making sure this function returns a -1
    var repeatAnswer = userAnswersArray.indexOf(userInput);
    // checks to make sure that the actor is on the array of answers by making sure this function does not return -1
    // var answerCheck = MovieCastArray.indexOf(userInput);
    var isvalidanswer = false;
    MovieCastArray.forEach(function (item) {
        if (item.levenstein(userInput) <= 2) {
            isvalidanswer = true;
            answer = item;
        } else {
            answer = answer;
        }
    });

    // // console.log(repeatAnswer);
    // // console.log(answerCheck);
    // if (answerCheck !== -1 && repeatAnswer === -1) {
    if (isvalidanswer && repeatAnswer === -1) {
        $("#WhyYouLost").text(answer + " was correct!");
        userAnswersArray.push(answer);
        //Adds 1 to the user Score
        currentScore++;
        $("#userCurrentScore").text(currentScore);
        //Runs the first round script again
        firstRound(answer);
        //Clears user text input
        // $("#userInput").val("");
    } else if (remainingLife > 1 && $("#userInput").val() === "") {
        if (remainingLife === 2) {
            $("#WhyYouLost").text(
                "Smart move skipping that one! " + (remainingLife - 1) + " live left"
            );
        } else {
            $("#WhyYouLost").text(
                "Smart move skipping that one! " + (remainingLife - 1) + " lives left"
            );
        }

        // $("#moviePoster").effect(
        //     "shake", "show", "slow"
        // );
        $("#computerSubmision").effect("bounce", "show", "slow");
        $("#life" + remainingLife).hide("explode", {
            duration: 1000
        }, "slow");
        remainingLife--;
        // // console.log(userInput);
        ComputerMovieIdArray.push(movieID);
        getListOfMoviesFromActorID(actorIdNumber);

        //Clears user text input
        $("#userInput").val("");
    } else if (remainingLife > 1 && $("#userInput").val() !== "") {
        $("#WhyYouLost").text(
            "You said them already or they aren't in the movie. " +
            (remainingLife - 1) +
            " lives left"
        );
        // $("#moviePoster").effect(
        //     "shake", "show", "slow"
        // );
        $("#computerSubmision").effect("bounce", "show", "slow");
        $("#life" + remainingLife).hide("explode", {
            duration: 1000
        }, "slow");
        remainingLife--;
        // // console.log(userInput);
        ComputerMovieIdArray.push(movieID);
        getListOfMoviesFromActorID(actorIdNumber);

        //Clears user text input
        $("#userInput").val("");
    } else {
        $("#WhyYouLost").text("You lose! Your final score was " + currentScore);
        //Tells the user they were wrong and asks them to restart by typing a name. Also removes the movie poster
        $("#computerSubmision").text(
            "You're out of lives! Enter a movie below to restart!"
        );
        // $("#moviePoster").attr("src", ""); //Clears out users data
        postGif();
        userAnswersArray = [];
        ComputerMovieIdArray = [];
        remainingLife = 3;
        //updates highscore if the users current game is better
        let userHighScore = parseInt($("#userHighScore").text());
        let userCurrentScore = parseInt($("#userCurrentScore").text());
        if (userCurrentScore > userHighScore) {
            $("#userHighScore").text(userCurrentScore);
            localStorage.setItem("userHighScore", JSON.stringify(userCurrentScore));
        }
        $("#life1").hide(); //Sets current score equal to zero again
        currentScore = 0;
        $("#userCurrentScore").text(currentScore);
        //Clears user text input
        $("#userInput").val("");
        userAnswersArray = [];
        MovieCastArray = [];
    }
}

// Allowing some eddit distance for typos
String.prototype.levenstein = function (string) {
    var a = this,
        b = string + "",
        m = [],
        i,
        j,
        min = Math.min;
    if (!(a && b)) return (b || a).length;
    for (i = 0; i <= b.length; m[i] = [i++]);
    for (j = 0; j <= a.length; m[0][j] = j++);
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            m[i][j] =
                b.charAt(i - 1) == a.charAt(j - 1) ?
                m[i - 1][j - 1] :
                (m[i][j] = min(
                    m[i - 1][j - 1] + 1,
                    min(m[i][j - 1] + 1, m[i - 1][j])
                ));
        }
    }
    return m[b.length][a.length];
};

function postGif() {
    let query = "you lose";
    let giphyQuery =
        "https://api.giphy.com/v1/gifs/search?api_key=" +
        giphyAPI +
        "&q=" +
        query +
        "&limit=25&offset=0&rating=g&lang=en";
    $.ajax({
        url: giphyQuery,
        method: "GET",
    }).then(function (response) {
        let randomIndex = Math.floor(Math.random() * (response.data.length - 1));
        $("#moviePoster").attr(
            "src",
            response.data[randomIndex].images.original.url
        );
    });
}