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
            $("#userSubmit").hide();
            $("#grouping").hide();
            $("#hideBtn").hide();
            $("#multipleChoiceDiv").show();
        } else {}
    }

    function multipleChoiceSubmit() {
        $("#multipleChoice").show();
        $("#hideBtn").show();
        $("#userTextField").show();
        $("#userSubmit").show();
        $("#grouping").show();
        $("#multipleChoiceDiv").hide();
    }
});