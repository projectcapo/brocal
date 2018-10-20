$(document).ready(function() {
    
    function getProfile(){
        $.get('/api/profile', function(data) {
            console.log(data);
        });
    }


    getProfile();

});