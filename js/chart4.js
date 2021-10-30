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
        time_chart = hour_chart + ":" + min_chart;
        array_time_chart4.push(time_chart);
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
    const x_data_chart = array_time_chart4;
    const y_data_chart1_4 = array_distance_chart1_4;
    const y_data_chart2_4 = array_distance_chart2_4;
    const y_data_chart3_4 = array_distance_chart3_4;
    const avg_data_chart1_4 = array_avg_chart1_4;
    const avg_data_chart2_4 = array_avg_chart2_4;
    const avg_data_chart3_4 = array_avg_chart3_4;
    x_length = array_time_chart4.length;

    const ctx = document.getElementById("chart-4").getContext("2d");
    myChart = new Chart(ctx, {
        data: {
            labels: x_data_chart,
            datasets: [{ //0
                    type: "line",
                    label: "Trạm 1",
                    data: y_data_chart1_4,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 2,
                },
                { //1
                    type: "line",
                    label: "Trạm 2",
                    data: y_data_chart2_4,
                    backgroundColor: "blue",
                    borderColor: "blue",
                    borderWidth: 2,
                },
                { //2
                    type: "line",
                    label: "Trạm 3",
                    data: y_data_chart3_4,
                    backgroundColor: "green",
                    borderColor: "green",
                    borderWidth: 2,
                },
                { //3
                    type: "scatter",
                    label: "TB Trạm 1",
                    data: avg_data_chart1_4,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    hidden: true,
                },
                { //4
                    type: "scatter",
                    label: "TB Trạm 2",
                    data: avg_data_chart2_4,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    hidden: true,
                },
                { //5
                    type: "scatter",
                    label: "TB Trạm 3",
                    data: avg_data_chart3_4,
                    backgroundColor: 'rgb(255, 159, 64)',
                    borderColor: 'rgb(255, 159, 64)',
                    borderWidth: 2,
                    hidden: true,
                },
            ],
        },
        options: {
            scales: {
                x: {
                    min: x_length - 30,
                    max: x_length,
                },
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 30,
                        font: {
                            size: 17
                        }
                    }
                }
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

setTimeout(showChart, 200);