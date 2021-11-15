var array_distance_chart1_4 = new Array();
var array_distance_chart2_4 = new Array();
var array_distance_chart3_4 = new Array();
var array_time_chart4 = new Array();
var array_avg_chart1_4 = new Array();
var array_avg_chart2_4 = new Array();
var array_avg_chart3_4 = new Array();

var params_chart1_4 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 1,
    },
};
var params_chart2_4 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 2,
    },
};
var params_chart3_4 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 3,
    },
};

var docClient = new AWS.DynamoDB.DocumentClient();
// Trạm 1
docClient.query(params_chart1_4, function(err, data) {

    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart1_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_chart1_4.push(distance_data_chart1_4);

        avg_chart1_4 = array_distance_chart1_4.reduce((a, b) => a + b, 0) / array_distance_chart1_4.length;
        avg_chart1_4_final = Math.round(avg_chart1_4 * 100) / 100; // Làm tròn
        array_avg_chart1_4.push(avg_chart1_4_final);
    }

    for (let i = 0; i < data.Items.length; i++) {
        sample_time_data_chart = JSON.parse(data.Items[i].sample_time);
        const time_stamp_chart = new Date(sample_time_data_chart);
        min_chart = time_stamp_chart.getMinutes();
        hour_chart = time_stamp_chart.getHours();

        const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        date = time_stamp_chart.getDate();
        month = month_name[time_stamp_chart.getMonth()];
        year = time_stamp_chart.getFullYear();

        if (min_chart < 10) {
            min_chart = '0' + min_chart;
        }
        if (date < 10) {
            date = '0' + date;
        }
        if (month < 10) {
            month = '0' + month;
        }
        full_time_chart = hour_chart + ":" + min_chart + ', ' + date + "/" + month;
        array_time_chart4.push(full_time_chart);
    }


});
// Trạm 2
docClient.query(params_chart2_4, function(err, data) {
    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart2_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_chart2_4.push(distance_data_chart2_4);

        avg_chart2_4 = array_distance_chart2_4.reduce((a, b) => a + b, 0) / array_distance_chart2_4.length;
        avg_chart2_4_final = Math.round(avg_chart2_4 * 100) / 100; // Làm tròn
        array_avg_chart2_4.push(avg_chart2_4_final);
    }
});
// Trạm 3
docClient.query(params_chart3_4, function(err, data) {
    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart3_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_chart3_4.push(distance_data_chart3_4);

        avg_chart3_4 = array_distance_chart3_4.reduce((a, b) => a + b, 0) / array_distance_chart3_4.length;
        avg_chart3_4_final = Math.round(avg_chart3_4 * 100) / 100; // Làm tròn
        array_avg_chart3_4.push(avg_chart3_4_final);
    }
});


function showChart() {
    x_data_chart_4 = array_time_chart4;
    y_data_chart1_4 = array_distance_chart1_4;
    y_data_chart2_4 = array_distance_chart2_4;
    y_data_chart3_4 = array_distance_chart3_4;
    avg_data_chart1_4 = array_avg_chart1_4;
    avg_data_chart2_4 = array_avg_chart2_4;
    avg_data_chart3_4 = array_avg_chart3_4;
    x_length_4 = array_time_chart4.length;

    const ctx = document.getElementById("chart-4").getContext("2d");
    myChart = new Chart(ctx, {
        data: {
            labels: x_data_chart_4,
            datasets: [{ //0
                    type: "line",
                    label: "Trạm 1",
                    data: y_data_chart1_4,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                },
                { //1
                    type: "line",
                    label: "Trạm 2",
                    data: y_data_chart2_4,
                    backgroundColor: "blue",
                    borderColor: "blue",
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                },
                { //2
                    type: "line",
                    label: "Trạm 3",
                    data: y_data_chart3_4,
                    backgroundColor: "green",
                    borderColor: "green",
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                },
                { //3
                    type: "line",
                    label: "TB Trạm 1",
                    data: avg_data_chart1_4,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    hidden: true,
                    cubicInterpolationMode: 'monotone',
                },
                { //4
                    type: "line",
                    label: "TB Trạm 2",
                    data: avg_data_chart2_4,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    hidden: true,
                    cubicInterpolationMode: 'monotone',
                },
                { //5
                    type: "line",
                    label: "TB Trạm 3",
                    data: avg_data_chart3_4,
                    backgroundColor: 'rgb(255, 159, 64)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    hidden: true,
                    cubicInterpolationMode: 'monotone',
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    min: x_length_4 - 51,
                    max: x_length_4,
                    ticks: {
                        color: 'black'
                    },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Độ cao (m)',
                        font: {
                            // family: 'Times',
                            size: 17,
                            weight: 'bold',
                        },
                        color: 'black'
                    },
                    ticks: {
                        color: 'black'
                    },
                },
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 20,
                        font: {
                            size: 14,
                        },
                    }
                },

            }

        },
    });
}
// Hiển thị biểu đồ
function toggleData(value) {
    const showValue = myChart.isDatasetVisible(value);
    if (showValue === true) {
        myChart.hide(value);
    }
    if (showValue === false) {
        myChart.show(value);
    }
};

function nextData(start, end) {
    x_length_4 = array_time_chart4.length;
    const startScale = myChart.options.scales.x.min + start;
    const endScale = myChart.options.scales.x.max + end;
    // console.log(startScale + start);

    // possition by defaut if
    myChart.options.scales.x.min = startScale;
    myChart.options.scales.x.max = endScale;
    document.getElementById('previous').disabled = false;
    document.getElementById('next').disabled = false;

    if (endScale > x_length_4) {
        myChart.options.scales.x.min = x_length_4 - 51;
        myChart.options.scales.x.max = x_length_4 - 1;
        document.getElementById('next').disabled = true;
    };

    if (startScale < 0) {
        myChart.options.scales.x.min = 0;
        myChart.options.scales.x.max = 50;
        document.getElementById('previous').disabled = true;
    };
    myChart.update();
}

// RESET CHART
function resetData() {
    x_length_4 = array_time_chart4.length;
    var x_scale_live = {
        min: x_length_4 - 51,
        max: x_length_4,
        ticks: {
            color: 'black'
        },
    };
    // myChart.data.datasets[0].data = live_y;
    // myChart.data.datasets[1].data = live_avg;
    // myChart.data.labels = live_x;
    myChart.options.scales.x = x_scale_live
    myChart.update();
};

setTimeout(showChart, 200);