$(document).ready(function () {

    function showAlertCount() {
        $.get("/api/alert/count", function (data) {
            if (data.count > 0) {
                $('#alertCount').css('display', "inline");
                $('#alertCount').text(data.count);
            } else {
                $('#alertCount').css('display', "none");
            }
        });
    }

    // Get all alerts on an event
    function getAlerts() {
        $.get("/api/alert", function (data) {
            data.forEach(function (alert) {
                M.toast({ html: alert.topic + ": " + alert.message });
            });
            showAlertCount();
        });
    }

    // Attach get alerts to the alert button on click
    $('#alertButton').click(getAlerts);

    // Initializes all materialize javascript components
    // with defaults.
    M.AutoInit();

    // Turn on toobar for FAB
    $('.fixed-action-btn').floatingActionButton({
        toolbarEnabled: true
    });

    //Show Alert count on page load.
    showAlertCount();

});