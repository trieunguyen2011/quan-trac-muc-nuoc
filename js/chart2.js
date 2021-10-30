var array_distance_chart2 = new Array();
var array_time_chart2 = new Array();

var params_chart2 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 2,
    },
};
var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart2, function(err, data) {
    if (err) {
        alert("Error !!!");
    } else {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart2 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart2.push(distance_data_chart2);
            if (array_distance_chart2.length > 10) {
                array_distance_chart2.shift();
            }
        }
        for (let i = 0; i < data.Items.length; i++) {
            sample_time_data_chart2 = JSON.parse(data.Items[i].sample_time);
            const time_stamp_chart2 = new Date(sample_time_data_chart2);
            min_chart2 = time_stamp_chart2.getMinutes();
            hour_chart2 = time_stamp_chart2.getHours();
            time_chart2 = hour_chart2 + ":" + min_chart2;
            array_time_chart2.push(time_chart2);
            if (array_time_chart2.length > 10) {
                array_time_chart2.shift();
            }
        }
        const x_data_chart2 = array_time_chart2;
        const y_data_chart2 = array_distance_chart2;
        const ctx = document.getElementById("chart-2").getContext("2d");
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: x_data_chart2,
                datasets: [{
                    label: "Trạm 2",
                    data: y_data_chart2,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
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