$(document).ready(function () {

    var weightTable = $('#weightTable').DataTable({
        responsive: true,
        ajax: {
            "url": "/api/weight",
            "dataSrc": ""
        },
        columns: [
            { data: "weighedtime",
            render: $.fn.dataTable.render.moment("MMMM DD YYYY") },
            { data: "currentweight" },
            { data: "feels" }
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


    function submitWeight() {
        $.post('/api/weight', {
            'currentweight': $('#weight').val().trim(),
            'feels': $("input[name='weightFeel']:checked").val(),
            'weighedtime': $('#weighedtime').val().trim()
        }).done(function () {
            weightTable.ajax.reload();
            $('#weight').val('');
            $("input[name='weightFeel']:checked").val('false');
        });
    }

    // Bind function to event
    $('#weightSubmit').click(submitWeight);

    $("#weightFeelingSelection").on("click", ".weightFeelIcon", function (e) {
        var id = $(this).attr("id");
        $("#" + id + "Radio").prop('checked', true);
    });

});