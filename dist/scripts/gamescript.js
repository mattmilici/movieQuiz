var trialMovies = ["Anchorman, Memento, Space Jam, Django, Ocean's 11"];
var api = "a610c6a9537cc833aef3465e46fba9e6";
var userInput;
var currentMovie;
var currentActor;
var userMovie;
var userActor;
var currentActorId;

//plan on making this function more robust, for now just going to be using it to input data already availible in html file
initGame();
function initGame() {
    currentMovie = "Anchorman";
    currentActor = "Will Ferrell";
    setQuestion("Will Ferrel");
    getActorId(currentActor);

};

function setPoster() {

    var temp = currentMovie.replace(" ","&20");
    $.ajax({
        url: "https://api.themoviedb.org/3/search/movie?api_key=" + api + "&language=en-US&query=" + temp + "&page=1&include_adult=false",
        method: "GET"
    }).then(function(result){

        console.log(result);
        $("#moviePoster").attr("src", "https://image.tmdb.org/t/p/w500" + result.results[0].poster_path);
    });
    
};

function setQuestion(input) {


    setPoster();
    $("#computerSubmision").text(currentMovie.toUpperCase());
};

$("#userSubmit").on("click", function () {
    userInput = $("#userInput").val();
    console.log(userInput);

    getAnotherMovie();
    setQuestion();
});

function getActorId(actor) {
    $.ajax({
        url: "https://api.themoviedb.org/3/search/person?api_key=" + api + "&language=en-US&query=" + actor + "&page=1&include_adult=false",
        method: "GET"
    }).then(function (e) {
        currentActorId = e.results[0].id;
        //console.log(e);
    });
}

function getAnotherMovie() {


    var getPerson = "https://api.themoviedb.org/3/search/person?api_key=" + api + "&language=en-US&query=" + currentActor + "&page=1&include_adult=false";
    var tempactor = userInput.toLowerCase();
  $.ajax({
    url: getPerson,
    method: "GET",
  }).then( (res) => {

    var personId = 0;
    for (let actorGetIndex = 0; actorGetIndex < res.results.length; actorGetIndex++) {
      console.log("result actor " + res.results[actorGetIndex].name);
      if (tempactor === res.results[actorGetIndex].name.toLowerCase()) {
        personId = res.results[actorGetIndex].id;
      }
    }
    let getMovieCredits = "https://api.themoviedb.org/3/person/" + personId + "/movie_credits?api_key=" + api + "&language=en-US";

    $.ajax({
      url: getMovieCredits,
      method: "GET",
    }).then( (movieResults) => {
        console.log(tempactor);
        console.log(movieResults);
    })
  });
}