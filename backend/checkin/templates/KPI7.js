$(function() {
    var $visitorChart = $("#visitor-chart7");
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
              text: 'New vs. Repeat Visitors per Week',
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