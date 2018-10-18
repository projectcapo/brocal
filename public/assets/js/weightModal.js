$(document).ready(function() {

    $("#weightFeelingSelection").on("click", ".weightFeelIcon", function(e){
        var id = $(this).attr("id");
        $("#" + id + "Radio").prop('checked', true);
    });
 
});