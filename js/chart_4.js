var array_distance_chart1 = new Array();
var array_distance_chart2 = new Array();
var array_distance_chart3 = new Array();
var array_time_chart = new Array();

var params_chart1 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 1,
    },
};
var params_chart2 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 2,
    },
};
var params_chart3 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 3,
    },
};

var docClient = new AWS.DynamoDB.DocumentClient();
// Trạm 1
docClient.query(params_chart1, function(err, data) {
    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart1 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_chart1.push(distance_data_chart1);
        if (array_distance_chart1.length > 10) {
            array_distance_chart1.shift();
        }
    }
    for (let i = 0; i < data.Items.length; i++) {
        sample_time_data_chart = JSON.parse(data.Items[i].sample_time);
        const time_stamp_chart = new Date(sample_time_data_chart);
        min_chart = time_stamp_chart.getMinutes();
        hour_chart = time_stamp_chart.getHours();
        time_chart = hour_chart + ":" + min_chart;
        array_time_chart.push(time_chart);
        if (array_time_chart.length > 10) {
            array_time_chart.shift();
        }
    }
    // Trạm 2
    docClient.query(params_chart2, function(err, data) {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart2 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart2.push(distance_data_chart2);
            if (array_distance_chart2.length > 10) {
                array_distance_chart2.shift();
            }
        }
        // Trạm 3
        docClient.query(params_chart3, function(err, data) {
            for (let i = 0; i < data.Items.length; i++) {
                distance_data_chart3 = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_chart3.push(distance_data_chart3);
                if (array_distance_chart3.length > 10) {
                    array_distance_chart3.shift();
                }
            }
            const x_data_chart = array_time_chart;
            const y_data_chart1 = array_distance_chart1;
            const y_data_chart2 = array_distance_chart2;
            const y_data_chart3 = array_distance_chart3;
            const ctx = document.getElementById("chart-4").getContext("2d");
            const myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: x_data_chart,
                    datasets: [{
                            label: "Trạm 1",
                            data: y_data_chart1,
                            backgroundColor: "red",
                            borderColor: "red",
                            borderWidth: 2,
                        },
                        {
                            label: "Trạm 2",
                            data: y_data_chart2,
                            backgroundColor: "blue",
                            borderColor: "blue",
                            borderWidth: 2,
                        },
                        {
                            label: "Trạm 3",
                            data: y_data_chart3,
                            backgroundColor: "green",
                            borderColor: "green",
                            borderWidth: 2,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        });
    });
});