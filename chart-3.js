var array_distance_chart3 = new Array();
var array_time_chart3 = new Array();

var params_chart3 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 3,
    },
};
var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart3, function(err, data) {
    if (err) {
        alert("Error !!!");
    } else {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart3 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart3.push(distance_data_chart3);
            if (array_distance_chart3.length > 10) {
                array_distance_chart3.shift();
            }
        }
        for (let i = 0; i < data.Items.length; i++) {
            sample_time_data_chart3 = JSON.parse(data.Items[i].sample_time);
            const time_stamp_chart3 = new Date(sample_time_data_chart3);
            min_chart3 = time_stamp_chart3.getMinutes();
            hour_chart3 = time_stamp_chart3.getHours();
            time_chart3 = hour_chart3 + ":" + min_chart3;
            array_time_chart3.push(time_chart3);
            if (array_time_chart3.length > 10) {
                array_time_chart3.shift();
            }
        }
        const x_data_chart3 = array_time_chart3;
        const y_data_chart3 = array_distance_chart3;
        const ctx = document.getElementById("chart-3").getContext("2d");
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: x_data_chart3,
                datasets: [{
                    label: "Trạm 1",
                    data: y_data_chart3,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    borderColor: "rgba(255, 99, 132, 1)",
                    borderWidth: 2,
                }, ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
});