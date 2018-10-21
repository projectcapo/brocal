$(document).ready(function () {

    // Get all alerts on an event
    function getAlerts() {
        $.get("/api/alert", function (data) {
            data.forEach(function (alert) {
                M.toast({ html: alert.topic + ": " + alert.message });
            });
        })
    }

    function showAlertCount() {
        $.get("/api/alert/count", function (data) {
            if (data.count > 0) {
                $('#alertCount').css('display', "block");
                $('#alertCount').text = data.length;
            }
        })
    }

    // Attach get alerts to the alert button on click
    $('#alertButton').click(getAlerts);

    // Initializes all materialize javascript components
    // with defaults.
    M.AutoInit();

    //Show Alert count on page load.
    showAlertCount();

});