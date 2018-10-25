$(document).ready(function () {

    $.get('/api/booze/today/calories', function(data){
        $('#todayTotal').text(data[0].totalCalories);
    });

    var boozeTableToday = $('#boozeTableToday').DataTable({
        responsive: true,
        ajax: {
            "url": "/api/booze/today",
            "dataSrc": ""
        },
        columns: [
            { data: "boozename" },
            { data: "servings" },
            { data: "calories" }
        ],
        order: [1, 'asc'],
        select: {
            style: 'os',
            selector: 'td:first-child'
        },
        buttons: [
            'update', 'delete'
        ]
    });

    var boozeTable = $('#boozeTable').DataTable({
        responsive: true,
        ajax: {
            "url": "/api/booze/",
            "dataSrc": ""
        },
        columns: [
            { data: "boozename" },
            { data: "servings" },
            { data: "calories" }
        ],
        order: [1, 'asc'],
        select: {
            style: 'os',
            selector: 'td:first-child'
        },
        buttons: [
            'update', 'delete'
        ]
    });


    function submitBooze() {
        $.post('/api/booze/', {
            'boozename': $('#drink').val().trim(),
            'servings': $('#servings').val().trim(),
            'calories': $('#calories').val().trim()
        }).done(function () {
            boozeTable.ajax.reload();
            boozeTableToday.ajax.reload();
        });
    }

    // Bind function to event
    $('#submitDrink').click(submitBooze);
});
