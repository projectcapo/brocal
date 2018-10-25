$(document).ready(function () {

    // Function to handle getting data for form fields.
    function getProfile() {
        $.get('/api/profile', function (data) {
            $('#age').val(data.age);
            $('#email').val(data.email);
            $('#firstname').val(data.firstname);
            $('#lastname').val(data.lastname);
            $('#goal_weight').val(data.goal_weight);
            $('#feet').val(Math.floor(data.height / 12));
            $('#inches').val(data.height % 12);
            $('#sex').val(data.sex);
            $('#start_weight').val(data.start_weight);
            $('#daily_caloric_intake').val(data.daily_caloric_intake);
            var elems = document.querySelectorAll('.datepicker');
            M.Datepicker.init(elems, {
                setDefaultDate: true,
                defaultDate: new Date(data.goal_end_date)
            });
            var elems = document.querySelectorAll('select');
            M.FormSelect.init(elems);
            M.updateTextFields();
        });
    }

    // Function to handle the update event when update is clicked.
    function updateProfile(event) {
        event.preventDefault();
        var elems = document.querySelectorAll('.datepicker');
        var endGoalDate = M.Datepicker.getInstance(elems[0]).date;
        var height = (parseInt($('#feet').val().trim()) * 12) + parseInt($('#inches').val().trim());

        $.ajax('/api/profile', {
            type: 'PUT',
            data: {
                age: $('#age').val().trim(),
                email: $('#email').val().trim(),
                firstname: $('#firstname').val().trim(),
                lastname: $('#lastname').val().trim(),
                goal_end_date: endGoalDate,
                goal_weight: $('#goal_weight').val().trim(),
                height: height,
                daily_caloric_intake: $('#daily_caloric_intake').val().trim(),
                sex: $('#sex').val().trim(),
                start_weight: $('#start_weight').val().trim()
            }
        }).then(function(){
            getProfile();
            M.toast({html: "Your profile has been updated"});
        });
    }

    // Bind Update Profile function to the click of the update button.
    $('#updateProfile').click(updateProfile);

    // Run on Page Load to prepopulate the data.
    getProfile();

});