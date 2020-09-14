$(function() {
    var $visitorChart = $("#visitor-chart2");
    $.ajax({
      url: $visitorChart.data("url"),
      success: function (data) {
        var ctx = $visitorChart[0].getContext("2d");
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [{
              backgroundColor: 'blue',
              data: data.data, 
            }]          
          },
          options: {
            responsive: true,
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Visitors Per Week',
              fontSize: 18,
              fontStyle: 'bold'
            },
            scales: {
              yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                  display: true, 
                  labelString: '# of Visitors',
                  fontSize: 15,
                  fontStyle: 'bold'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Week Starting',
                  fontSize: 15,
                  fontStyle: 'bold'
                }
              }]
            }
          }
        });

      }
    });
  });