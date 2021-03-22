const dayStrings = {
    // 1: "Sunday",
    2: "Monday",
    3: "Tuesday",
    4: "Wednesday",
    5: "Thursday",
    6: "Friday",
    // 7: "Saturday"
};

$(function () {
    const $vphChart = $("#visitor-chart9");
    $.ajax({
        url: $vphChart.data("url"),
        success: function (data) {
            var ctx = $vphChart[0].getContext("2d");
            const maxVal = Object.values(data.data).reduce((result, hours) => {
                return Math.max(result, Math.max.apply(null, Object.values(hours)));
            }, 0);
            const color = d3.scaleLinear()
                .domain([0, maxVal])
                .range(["#fcf803", "#04066e"]);
            dataResult = []
            let min = 24;
            let max = 0;
            Object.entries(data.data).forEach(([day, dayHours]) => {
                Object.entries(dayHours).forEach(([hour, visitCount]) => {
                    min = Math.min(min, hour);
                    max = Math.max(max, hour);
                    if (day > 1 && day < 7) {
                        dataResult.push({x: parseInt(hour), y: dayStrings[day], v: visitCount});
                    }
                })
            })
            new Chart(ctx, {
				type: 'matrix',
				data: {
					datasets: [{
						label: 'Hours',
						data: dataResult,
						backgroundColor: function(ctx) {
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
				options: {
                    title: {
                        display: true,
                        text: 'Visitors Per Hour (Aggregate)',
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
						xAxes: [{
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
						}],
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
				}
            });

            // Create Legend
            const grdCtx = $("#chart9-box")[0].getContext("2d");

            var grd = grdCtx.createLinearGradient(0, 0, 200, 20);
            grd.addColorStop(0, color(0));
            grd.addColorStop(1, color(maxVal));

            // Fill with gradient
            grdCtx.fillStyle = grd;
            grdCtx.fillRect(10, 10, 300, 30);
            $("#chart9-max").text(maxVal);
        }
    });
});
