$(function () {
    var $visitorChart = $("#visitor-chart10");
    $.ajax({
      url: $visitorChart.data("url"),
      success: function (data) {
        var ctx = $visitorChart[0].getContext("2d");
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.labels,
            datasets: [{
              label: null,
              backgroundColor: 'blue',
              data: data.data
            }]          
          },
          options: {
            responsive: true,
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'Visitors Bar Chart'
            }
          }
        });
      }
    });
  });