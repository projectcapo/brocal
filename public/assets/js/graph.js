$(document).ready(function () {
    // Graph Data ##############################################

    var graphData = [];
    var wgdata;
    var cgdata; 

    $.get('/api/weightData', function (data, err) {
        wgdata = {
            //weight log
            label: "Weight per day of month", 
            data: data,
            color: '#77b7c5',
            points: {
                radius: 5,
                fillColor: '#77b7c5'
            }
        }
    });

    $.get('/api/calData', function (data, err) {
        cgdata  = {
           // calories log
           label: "Calories per day of month",
            data: data,
            color: '#71c73e'
        };
        graphData = [wgdata,cgdata];

        // Lines Graph #############################################
        $.plot($('#graph-lines'), graphData, {
            series: {
                points: {
                    show: true,
                    radius: 5
                },
                lines: {
                    show: false
                },
                shadowSize: 0
            },
            grid: {
                color: '#646464',
                borderColor: 'transparent',
                borderWidth: 20,
                hoverable: true
            },
            xaxis: {
                tickColor: 'transparent',
                tickDecimals: 0
            },
            yaxis: {
                tickSize: 150
            },
            legend: {
                container: $('#legendContainer')
            },
            easing: 'easeOutBounce'
        });

        // Bars Graph ##############################################
        $.plot($('#graph-bars'), graphData, {
            series: {
                bars: {
                    show: true,
                    barWidth: .9,
                    align: 'center'
                },
                shadowSize: 0
            },
            grid: {
                color: '#646464',
                borderColor: 'transparent',
                borderWidth: 20,
                hoverable: true
            },
            xaxis: {
                tickColor: 'transparent',
                tickDecimals: 0
            },
            yaxis: {
                tickSize: 100
            },
            legend: {
                container: $('#legendContainer')
            }
        });

        // Graph Toggle ############################################
        $('#graph-bars').hide();

        $('#lines').on('click', function (e) {
            console.log('lines');
            $('#bars').removeClass('active');
            $('#graph-bars').fadeOut();
            $(this).addClass('active');
            $('#graph-lines').fadeIn();
            e.preventDefault();
        });

        $('#bars').on('click', function (e) {
            $('#lines').removeClass('active');
            $('#graph-lines').fadeOut();
            $(this).addClass('active');
            $('#graph-bars').fadeIn().removeClass('hidden');
            e.preventDefault();
        });

        // Tooltip #################################################
        function showTooltip(x, y, contents) {
            $('<div id="tooltip">' + contents + '</div>').css({
                top: y - 16,
                left: x + 20
            }).appendTo('body').fadeIn();
        }

        var previousPoint = null;

        $('#graph-lines, #graph-bars').bind('plothover', function (event, pos, item) {
            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;
                    $('#tooltip').remove();
                    var x = item.datapoint[0],
                        y = item.datapoint[1];
                    showTooltip(item.pageX, item.pageY, y + " on day " + x + ".");
                }
            } else {
                $('#tooltip').remove();
                previousPoint = null;
            }
        });

    });

});