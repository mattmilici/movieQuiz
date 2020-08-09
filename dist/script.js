$("#hideBtn").on("click", hideFunction);
$("#cardViewAgain").on("click", hideFunction);

$("#textChat").hide();

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