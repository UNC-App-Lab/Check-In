const dayStrings = {
    // 1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    // 7: "Saturday"
};

var chart9 = null;
var chartOptions = null;

function generateDataResultMinMax(inputData) {
    dataResult = []
    let min = 24;
    let max = 0;
    Object.entries(inputData.data).forEach(([day, dayHours]) => {
        Object.entries(dayHours).forEach(([hour, visitCount]) => {
            min = Math.min(min, hour);
            max = Math.max(max, hour);
            if (day > 1 && day < 7) {
                dataResult.push({x: parseInt(hour), y: dayStrings[day], v: visitCount});
            }
        })
    });
    return {dataResult, min, max};
}

function generateXScale(min, max) {
    return {
        scaleLabel: {
            display: true, 
            labelString: 'Hour',
            fontSize: 15,
            fontStyle: 'bold'
            },
        ticks: {
            display: true,
            min: min - 0.5,
            max: max + 0.5,
            stepSize: 1,
            padding: 5,
            callback: function (value, index) {
                return value + ":00";
            }
        },
        gridLines: {
            display: false
        },
        afterBuildTicks: function(scale, ticks) {
            return ticks.slice(1, ticks.length - 1);
        }
    };
}

function createChart(data) {
    const $vphChart = $("#visitor-chart9");
    var ctx = $vphChart[0].getContext("2d");
    const maxVal = Object.values(data.data).reduce((result, hours) => {
        return Math.max(result, Math.max.apply(null, Object.values(hours)));
    }, 0);
    const color = d3.scaleLinear()
        .domain([0, maxVal])
        .range(["#fcf803", "#04066e"]);
    const {dataResult, min, max} = generateDataResultMinMax(data);
    const xScale = generateXScale(min, max);
    chartOptions = {
        title: {
            display: true,
            text: 'Visitors Per Weekday-Hour (Fall 2021)',
            fontSize: 18,
            fontStyle: 'bold'
            },
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                title: function(item, data) { 
                    var info = data.datasets[item[0].datasetIndex].data[item[0].index];
                    var day = info.y;
                    var time = info.x + ":00";
                    return day + " " + time;
                },
                label: function(item, data) {
                    var v = data.datasets[item.datasetIndex].data[item.index];
                    return "" + v.v; // If not convereted to a string, it will not show 0's
                }
            }
        },
        scales: {
            xAxes: [xScale],
            yAxes: [{
                type: 'category',
                scaleLabel: {
                    display: true, 
                    labelString: 'Day',
                    fontSize: 15,
                    fontStyle: 'bold'
                    },
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                gridLines: {
                    display: false
                }
            }]
        },
    };
    chart9 = new Chart(ctx, {
        type: 'matrix',
        data: {
            datasets: [{
                label: 'Hours',
                data: dataResult,
                backgroundColor: function(ctx) {
                    if (!ctx.dataset.data[ctx.dataIndex]) {
                        return;
                    }
                    var value = ctx.dataset.data[ctx.dataIndex].v;
                    if (value === 0) {
                        return "#fff"
                    }
                    return color(value);
                },
                width: function(ctx) {
                    var a = ctx.chart.chartArea;
                    var diff = max - min;
                    return (a.right - a.left) / (diff + diff * 0.2);
                },
                height: function(ctx) {
                    var a = ctx.chart.chartArea;
                    return (a.bottom - a.top) / 9;
                }
            }]
        },
        options: chartOptions
    });

    // Create Legend
    const canvas =$("#chart9-box")[0];
    const grdCtx = canvas.getContext("2d");

    var grd = grdCtx.createLinearGradient(0, 0, 200, 20);
    grd.addColorStop(0, color(0));
    grd.addColorStop(1, color(maxVal));

    // Fill with gradient
    grdCtx.fillStyle = grd;
    grdCtx.fillRect(0, 0, canvas.width, canvas.height);
    $("#chart9-max").text(maxVal);
}

function updateChartData(inputData) {
    if (chart9) {
        const {dataResult, min, max} = generateDataResultMinMax(inputData);
        const xScale = generateXScale(min, max);
        chart9.data.datasets.forEach((dataset) => {
            dataset.data = dataResult;
        });
        chartOptions.scales.xAxes = [xScale];
        chart9.update();
    }
}


$(function () {
    const $vphChart = $("#visitor-chart9");
    const weeksSelect = $("#chart9-weeks");
    function dateToNum(num) {
        var split = num.split("-");
        if (split.length < 3) {
            return -1;
        }
        return Number(split[0] + split[1] + split[2]);
    }
    $.ajax({
        url: $vphChart.data("url"),
        success: function (data) {
            data.weeks.sort((a, b) => {
                const aNum = dateToNum(a);
                const bNum = dateToNum(b);
                if (aNum < 0) {
                    return -1;
                } else if (bNum < 0) {
                    return 1;
                }
                return aNum - bNum;
            }).forEach(week => {
                weeksSelect.append($('<option>', {
                    value: week,
                    text: `Week of ${week}`
                }));
            });
            createChart(data);
        }
    });
    weeksSelect.change(() => {
        const selected = $("#chart9-weeks option:selected");
        $.ajax({
            url: $vphChart.data("url"),
            data: {
                week: selected.attr("value")
            },
            success: (response) => {
                updateChartData(response);
            }
        })
    });
});
