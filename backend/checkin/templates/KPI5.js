$(function() {
    var $visitorChart = $("#visitor-chart5");
    $.ajax({
      url: $visitorChart.data("url"),
      success: function (data) {
        var ctx = $visitorChart[0].getContext("2d");
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: data.data          
          },
          options: {
            responsive: true,
            title: {
              display: true,
              text: 'Visitors Per Weekday by Semester',
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
                  labelString: '# Visitors',
                  fontSize: 15,
                  fontStyle: 'bold'
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Weekday',
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