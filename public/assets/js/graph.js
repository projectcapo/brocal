$(document).ready(function () {
    // Graph Data ##############################################
    
    $.get('/api/weightData', function (data, err) {
        var graphData = [{
           // calories log
           label: "Daily Calorie Intake",
            data: data.calData,
            color: '#71c73e'
        }, {
            //weight log
            label: "Daily Weight Gain/Loss", 
            data: data.weightData,
            color: '#77b7c5',
            points: {
                radius: 4,
                fillColor: '#77b7c5'
            }
        }];

        // Lines Graph #############################################
        $.plot($('#graph-lines'), graphData, {
            series: {
                points: {
                    show: true,
                    radius: 5
                },
                lines: {
                    show: true
                },
                shadowSize: 0
            },
            grid: {
                color: '#646464',
                borderColor: 'transparent',
                borderWidth: 10,
                hoverable: true
            },
            xaxis: {
                tickColor: 'transparent',
                tickDecimals: 0,
                title: "test"
                        
            },
            yaxis: {
                tickSize: 200,
            },
            legend: {
                container: $('#legendContainer')
            }
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
        console.log(graphData);

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