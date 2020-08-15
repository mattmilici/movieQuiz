//everything is working at this pointvar startRunningScripts = false;
var MovieCastArray = [];
var userAnswersArray = [];
var ComputerMovieIdArray = [];
var apiKey = "api_key=a610c6a9537cc833aef3465e46fba9e6&language=en-US&query";
var giphyAPI = "1I9K6gwnF2ljgEW2mzK2VdGc4CU7iX8g";
var apiDomain = "https://api.themoviedb.org/3/"; //score related items
var remainingLife = 3;
var currentScore = 0; //Button Pressed by user to submit an answer
$("#userSubmit").on("click", standardGame); //StandardGame function is what determines if the first or second round script should run. If the movie cast array equals zero, then computer knows to run the firstRound Script which will not provide any points. The seconds round script will run after that and check to make sure the user isn't inputting the same actor twice. It also adds points to the current score.
function standardGame() {
    var movieArrayLength = MovieCastArray.length;
    if (movieArrayLength === 0) {
        var userInput = $("#userInput").val();
        userAnswersArray.push(userInput);
        firstRound();
    }
    if (movieArrayLength !== 0) {
        secondRoundForward();
        console.log(userAnswersArray);
    }
} //firstRoundScript takes the users input and generate a movie they've been in based off of the actors ID. We then run the getListMoviesFromActorID to ger a list of the movies the actors been in.
function firstRound(answer) {
    if (answer == undefined || answer == null){
        userInput = $("#userInput").val();
    }else {
        userInput = answer;
    }
    //creates an array of user answers. This is how we can make sure the user doesn't enter the same actor twice in one game
    // userAnswersArray.push(userInput);
    // console.log(userAnswersArray);
    //call request from movie API
    $.ajax({
        url: apiDomain +
            "search/person?" +
            apiKey +
            "&language=en-US&query=" +
            userInput +
            "&page=1&include_adult=false",
        method: "GET",
    }).then(function (e) {
        var actorIdNumber = e.results[0].id;
        getListOfMoviesFromActorID(actorIdNumber);
    });
}

function getListOfMoviesFromActorID(actorIdNumber) {
    // console.log(actorIdNumber);
    //Takes the actors ID and finds all the movies they've been in.
    $.ajax({
        url: apiDomain +
            "person/" +
            actorIdNumber +
            "/movie_credits?" +
            apiKey +
            "&language=en-US",
        method: "GET",
    }).then(function (movieList) {
        //setting a random movie title on screen. This represents the computers answers and will always be a movie the actor was in.
        console.log(movieList);
        var randomNumber = Math.floor(Math.random() * 4);
        console.log(randomNumber);
        var movieCastArrayLength = movieList.cast.length - 1;
        if (randomNumber > movieCastArrayLength) {
            firstRound();
        }
        var movieTitle = movieList.cast[randomNumber].title;
        var moviePoster = movieList.cast[randomNumber].poster_path;
        console.log(MovieRepeatCheck); //Grabs the poster for the movie generated above and displays it on screen.        //this gets a list of Actors that were in the movie
        var movieID = movieList.cast[randomNumber].id;
        var MovieRepeatCheck = ComputerMovieIdArray.indexOf(movieID);
        if (movieCastArrayLength === 0 && MovieRepeatCheck !== -1) {
            userWins();
        } else if (
            MovieRepeatCheck !== -1 ||
            moviePoster === null ||
            movieTitle === undefined ||
            movieID === -1
        ) {
            // console.log("true");
            firstRound();
        } else {
            ComputerMovieIdArray.push(movieID);
            console.log(ComputerMovieIdArray);
            // Adds new movie Poster Image to HTML
            console.log(moviePoster);
            $("#moviePoster").attr(
                "src",
                "https://image.tmdb.org/t/p/w500" + moviePoster
            );
            $("#moviePoster").effect(
                "slide", "show", "slow"
            );
            $("#computerSubmision").text(movieTitle);
            console.log("there is a movie title");
            getMovieCastMembers(movieID);
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

function getMovieCastMembers(movieID) {
    $.ajax({
        url: apiDomain +
            "movie/" +
            movieID +
            "/credits?" +
            apiKey +
            "&page=1&include_adult=false",
        method: "GET",
    }).then(function (result) {
        //this provides the first 40 actors listed on the cast sheet. We can increase this if needed.
        MovieCastArray = [];
        console.log(result);
        for (let i = 0; i < result.cast.length; i++) {
            var movieCastMember = result.cast[i].name;
            MovieCastArray.push(movieCastMember);
        }
        //this removes the actor the user just entered so they can't use it twice
        var MovieCastArrayPop = MovieCastArray.indexOf(userInput);
        MovieCastArray.splice(MovieCastArrayPop, 1);
        console.log(MovieCastArray);
        //Clears user text input
        $("#userInput").val("");
    });


}

function secondRoundForward() {
    // gets the users current input
    userInput = $("#userInput").val(); // checks to make sure that it is not on the array of answers by making sure this function returns a -1
    var repeatAnswer = userAnswersArray.indexOf(userInput);
    // checks to make sure that the actor is on the array of answers by making sure this function does not return -1
    var answerCheck = MovieCastArray.indexOf(userInput);
    var isvalidanswer = false;
    var answer;
    MovieCastArray.forEach(function(item){
        if(item.levenstein(userInput) <=2){
            isvalidanswer = true;
            answer = item;
        }
    });

    // console.log(repeatAnswer);
    // console.log(answerCheck);
    // if (answerCheck !== -1 && repeatAnswer === -1) {
        if (isvalidanswer && repeatAnswer === -1){
        userAnswersArray.push(answer);
        //Adds 1 to the user Score
        currentScore++;
        $("#userCurrentScore").text(currentScore);
        //Runs the first round script again
        firstRound(answer);
        //Clears user text input
        // $("#userInput").val("");
    } else if (remainingLife > 1) {
        $("#computerSubmision").text(
            "Nope! You now have " + (remainingLife - 1) + " lives left"
        );
        $("#life" + remainingLife).hide();
        remainingLife--;
        //Clears user text input
        $("#userInput").val("");
    } else {
        //Tells the user they were wrong and asks them to restart by typing a name. Also removes the movie poster
        $("#computerSubmision").text(
            "incorrect you lose! Enter a name below to restart!"
        );
        // $("#moviePoster").attr("src", ""); //Clears out users data
        postGif();
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
        MovieCastArray = [];
    }
}

// Allowing some eddit distance for typos
String.prototype.levenstein = function (string) {
    var a = this, b = string + "", m = [], i, j, min = Math.min;
    if (!(a && b)) return (b || a).length;
    for (i = 0; i <= b.length; m[i] = [i++]);
    for (j = 0; j <= a.length; m[0][j] = j++);
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            m[i][j] = b.charAt(i - 1) == a.charAt(j - 1)
                ? m[i - 1][j - 1]
                : m[i][j] = min(
                    m[i - 1][j - 1] + 1,
                    min(m[i][j - 1] + 1, m[i - 1][j]))
        }
    }
    return m[b.length][a.length];
}

function postGif() {
    let query = "you lose";
    let giphyQuery = "https://api.giphy.com/v1/gifs/search?api_key=" + giphyAPI + "&q=" + query + "&limit=25&offset=0&rating=g&lang=en";
    $.ajax({
        url : giphyQuery,
        method: "GET"
    }).then(function(response) {
        let randomIndex = Math.floor(Math.random() * (response.data.length - 1));
        $("#moviePoster").attr("src", response.data[randomIndex].images.original.url);
    });
}