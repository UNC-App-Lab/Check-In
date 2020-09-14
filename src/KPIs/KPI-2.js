import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const kpi2 = () => {
    return (
        // <div>
        //     KPI PAGE 2
        //     <div>
        //         <p>KPI Page 2</p>
        //     </div>
        // </div>
        <div>
        <div id="container" style="width: 75%;">
            <canvas id="visitor-chart" data-url="{% url 'visitor-chart' %}"></canvas>
        </div>

        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>
        <script>

            {$(function () {

            var $visitorChart = $("#visitor-chart");
            $.ajax({
                url: $visitorChart.data("url"),
                success: function (data) {

                var ctx = $visitorChart[0].getContext("2d");

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                    labels: data.labels,
                    datasets: [{
                        label: 'Visitors',
                        backgroundColor: 'blue',
                        data: data.data
                    }]          
                    },
                    options: {
                    responsive: true,
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Visitors Bar Chart'
                    }
                    }
                });

                }
            });

            })};

        </script>
        </div>
    );
}

export default kpi2;