"use strict";
var arrData = [];
var ajaxData = new Ajax("post", "get_raw_data");
ajaxData.onSuccess = function (data) {
    var txtValue = document.querySelector("#txtValue");
    txtValue.setAttribute("value", "" + data.data);
    try {
        var value = parseFloat(data.data);
        var dot = {
            x: arrData.length,
            y: value
        };
        arrData.push(dot);
        if (graph.series[0].data.length >= len) {
            graph.series[0].addPoint([dot.x, dot.y], true, true);
        }
        else {
            graph.series[0].addPoint([dot.x, dot.y]);
        }
    }
    catch (e) {
    }
};
//Iniciar Formulario
var len = 100;
var time = 250;
$(document).ready(function () {
    makeChart();
});
//declarar gráfico
var graph;
var makeChart = function () {
    graph = Highcharts.chart('graph', {
        chart: {
            //type: 'spline',
            //animation: Highcharts.svg, // don't animate in old IE
            animation: {
                duration: (time / 2)
            },
            marginRight: 10,
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    setInterval(function () {
                        ajaxData.send();
                    }, time);
                }
            }
        },
        time: {
            useUTC: false
        },
        title: {
            text: 'Live random data'
        },
        xAxis: {
            type: 'number',
            tickPixelInterval: 1
        },
        yAxis: {
            min: 0,
            max: 1024,
            title: {
                text: 'Value'
            },
            plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
                name: 'Random data',
                data: []
            }]
    });
};
