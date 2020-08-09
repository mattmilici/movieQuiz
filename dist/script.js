$("#hideBtn").on("click", hideFunction);
$("#cardViewAgain").on("click", hideFunction);
$("#multipleChoice").on("click", multipleChoice);
$("#submitBtnMultiple").on("click", multipleChoiceSubmit);

$("#textChat").hide();
$("#multipleChoiceDiv").hide();

function hideFunction() {
    var buttonStatus = $("#hideBtn").attr("id");

    if (buttonStatus === "hideBtn") {
        $("#textChat").hide();
        $("#hideBtn").attr("id", "showBtn");
        $("#cardView").show();
    } else {
        $("#textChat").show();
        $("#showBtn").attr("id", "hideBtn");
        $("#cardView").hide();
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