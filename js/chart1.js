var array_distance_chart1 = new Array();
var array_time_chart1 = new Array();
var array_time_update = new Array();

AWS.config.update({
    region: "ap-northeast-1",
    endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
    accessKeyId: "AKIAXKZISWAEZWPSCIVL",
    secretAccessKey: "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",
});

var params_chart1 = {
    TableName: "water_level",
    KeyConditionExpression: "device_id = :a",
    ExpressionAttributeValues: {
        ":a": 1,
    },
};

var docClient = new AWS.DynamoDB.DocumentClient();
docClient.query(params_chart1, function(err, data) {
    if (err) {
        alert("Error !!!");
    } else {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart1 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart1.push(distance_data_chart1);
        }
        for (let i = 0; i < data.Items.length; i++) {
            sample_time_data_chart1 = JSON.parse(data.Items[i].sample_time);
            const time_stamp_chart1 = new Date(sample_time_data_chart1);
            min_chart1 = time_stamp_chart1.getMinutes();
            hour_chart1 = time_stamp_chart1.getHours();

            const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            date = time_stamp_chart1.getDate();
            month = month_name[time_stamp_chart1.getMonth()];
            year = time_stamp_chart1.getFullYear();

            full_time_update = hour_chart1 + ":" + min_chart1 + ', ' + date + "/" + month + "/" + year;
            time_chart1 = hour_chart1 + ":" + min_chart1;
            array_time_chart1.push(time_chart1);
            array_time_update.push(full_time_update);
        }
        display_time = array_time_update[array_time_update.length - 1];
        document.getElementById("display_time").innerHTML = display_time;


        // Biểu đồ
        const x_data_chart1 = array_time_chart1;
        const y_data_chart1 = array_distance_chart1;
        x_length_1 = x_data_chart1.length;

        const ctx = document.getElementById("chart-1").getContext("2d");
        const myChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: x_data_chart1,
                datasets: [{
                    label: "Trạm 1",
                    data: y_data_chart1,
                    backgroundColor: 'rgb(54, 162, 235)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                }, ],
            },
            options: {
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    x: {
                        min: x_length_1 - 20,
                        max: x_length_1,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }
});