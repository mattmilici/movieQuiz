$(document).ready(function() {
    $("#hideBtn").on("click", hideFunction);
    $("#cardViewAgain").on("click", hideFunction);
    $("#multipleChoice").on("click", multipleChoice);
    $("#submitBtnMultiple").on("click", multipleChoiceSubmit);

    $("#textChat").hide();
    $("#multipleChoiceDiv").hide();

    function hideFunction() {
        var buttonStatus = $(this).attr("id");

        if (buttonStatus === "hideBtn") {
            $("#textChat").show();
            $("#cardView").hide();
        } else {
            $("#textChat").hide();
            $("#cardView").show();
        }
    }

    function multipleChoice() {
        var buttonStatus = $("#multipleChoice").attr("id");

        if (buttonStatus === "multipleChoice") {
            $("#textChat").hide();
            $("#multipleChoice").hide();
            $("#hideBtn").hide();
            $("#userTextField").hide();
            $("#startTyping").hide();
            $("#grouping").hide();
            $("#hideBtn").hide();
            $("#multipleChoiceDiv").show();
        } else {}
    }

    function multipleChoiceSubmit() {
        $("#multipleChoice").show();
        $("#hideBtn").show();
        $("#userTextField").show();
        $("#startTyping").show();
        $("#grouping").show();
        $("#multipleChoiceDiv").hide();
    }

    $("#nextButton").on("click", instructionsFlow);

    function instructionsFlow() {
        var currentClass = $(this);
        if (currentClass.hasClass("nextButton1")) {
            $("#roundsHeader").removeClass("animate-bounce");
            $("#roundsHeader").removeClass("opacity-100");
            $("#roundsHeader").addClass("opacity-25");

            $("#currentMovieTitle").addClass("animate-bounce");
            $("#currentMovieTitle").addClass("opacity-100");
            $("#currentMovieTitle").removeClass("opacity-25");

            $("#currentMovieImage").addClass("opacity-100");
            $("#currentMovieImage").removeClass("opacity-25");

            $("#instructionsHeader").text("Current Movie");
            $("#instructionsDescr").text(
                "You will have to name an actor that was in the current movie."
            );

            $("#nextButton").addClass("nextButton2");
            $("#nextButton").removeClass("nextButton1");
        } else if (currentClass.hasClass("nextButton2")) {
            $("#UserInstructionsDiv").removeClass("bottom-0");
            $("#UserInstructionsDiv").addClass("top-0");

            $("#currentMovieTitle").removeClass("animate-bounce");
            $("#currentMovieTitle").addClass("opacity-25");
            $("#currentMovieTitle").removeClass("opacity-100");

            $("#currentMovieImage").addClass("opacity-25");
            $("#currentMovieImage").removeClass("opacity-100");

            $("#userTextField").addClass("animate-bounce");
            $("#startTyping").addClass("animate-bounce");

            $("#userTextField").removeClass("opacity-25");
            $("#userTextField").addClass("opacity-100");

            $("#startTyping").removeClass("opacity-25");
            $("#startTyping").addClass("opacity-100");

            $("#instructionsHeader").text("User Answer");
            $("#instructionsDescr").text(
                "This is where you enter your answer and submit your answer. PS Make sure the spelling is correct!"
            );
            $("#nextButton").addClass("nextButton4");
            $("#nextButton").removeClass("nextButton2");
        } else if (currentClass.hasClass("nextButton4")) {
            $("#userTextField").removeClass("animate-bounce");
            $("#userTextField").addClass("opacity-25");
            $("#userTextField").removeClass("opacity-100");

            $("#startTyping").removeClass("animate-bounce");
            $("#startTyping").addClass("opacity-25");
            $("#startTyping").removeClass("opacity-100");

            $("#hideBtn").addClass("animate-bounce");
            $("#hideBtn").removeClass("opacity-25");
            $("#hideBtn").addClass("opacity-100");

            $("#instructionsHeader").text("Remaining Life");
            $("#instructionsDescr").text("You start each game with Three lives");
            $("#nextButton").addClass("nextButton5");
            $("#nextButton").removeClass("nextButton4");
        } else if (currentClass.hasClass("nextButton5")) {
            $("#hideBtn").removeClass("animate-bounce");
            $("#hideBtn").addClass("opacity-25");
            $("#hideBtn").removeClass("opacity-100");

            $("#instructionsHeader").text("That's it!");
            $("#instructionsDescr").text(
                "So you think you're a movie Buff? Let's test your knowledge!"
            );

            $("#nextButton").addClass("nextButton6");
            $("#nextButton").removeClass("nextButton5");
            $("#nextButton").text("Play!");
        } else {
            $("#nextButton").attr("id", "playBtn");
        }
    }
    $(document).on("click", "#playBtn", changePage);

    function changePage() {
        location.href = "index.html";
    }
});