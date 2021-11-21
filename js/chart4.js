var myChart;

//Live
var array_distance_live_1 = new Array();
var array_time_live = new Array();
var array_avg_live_1 = new Array();

var array_distance_live_2 = new Array();
var array_avg_live_2 = new Array();

var array_distance_live_3 = new Array();
var array_avg_live_3 = new Array();

//1 ngày
var array_distance_1ngay_1 = new Array();
var array_time_1ngay = new Array();
var array_avg_1ngay_1 = new Array();
var array_avg_1ngay_1_0 = new Array();

var array_distance_1ngay_2 = new Array();
var array_avg_1ngay_2 = new Array();
var array_avg_1ngay_2_0 = new Array();

var array_distance_1ngay_3 = new Array();
var array_avg_1ngay_3 = new Array();
var array_avg_1ngay_3_0 = new Array();

//3 ngày
var array_distance_3ngay_1 = new Array();
var array_time_3ngay = new Array();
var array_avg_3ngay_1 = new Array();
var array_avg_3ngay_1_0 = new Array();

var array_distance_3ngay_2 = new Array();
var array_avg_3ngay_2 = new Array();
var array_avg_3ngay_2_0 = new Array();

var array_distance_3ngay_3 = new Array();
var array_avg_3ngay_3 = new Array();
var array_avg_3ngay_3_0 = new Array();

//7 ngày
var array_distance_7ngay_1 = new Array();
var array_time_7ngay = new Array();
var array_avg_7ngay_1 = new Array();
var array_avg_7ngay_1_0 = new Array();

var array_distance_7ngay_2 = new Array();
var array_avg_7ngay_2 = new Array();
var array_avg_7ngay_2_0 = new Array();

var array_distance_7ngay_3 = new Array();
var array_avg_7ngay_3 = new Array();
var array_avg_7ngay_3_0 = new Array();

//15 ngày
var array_distance_15ngay_1 = new Array();
var array_time_15ngay = new Array();
var array_avg_15ngay_1 = new Array();
var array_avg_15ngay_1_0 = new Array();

var array_distance_15ngay_2 = new Array();
var array_avg_15ngay_2 = new Array();
var array_avg_15ngay_2_0 = new Array();

var array_distance_15ngay_3 = new Array();
var array_avg_15ngay_3 = new Array();
var array_avg_15ngay_3_0 = new Array();

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
// Trạm 1----------------------------------------------------------------------------------------------------
docClient.query(params_chart1_4, function(err, data) {

    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart1_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_live_1.push(distance_data_chart1_4);
        array_distance_1ngay_1.push(distance_data_chart1_4);
        array_distance_3ngay_1.push(distance_data_chart1_4);
        array_distance_7ngay_1.push(distance_data_chart1_4);
        array_distance_15ngay_1.push(distance_data_chart1_4);

        avg_chart1_4 = array_distance_live_1.reduce((a, b) => a + b, 0) / array_distance_live_1.length;
        avg_chart1_4_final = Math.round(avg_chart1_4 * 100) / 100; // Làm tròn
        array_avg_live_1.push(avg_chart1_4_final);

        if (array_distance_1ngay_1.length > 96) {
            array_distance_1ngay_1.shift();
        }
        if (array_distance_3ngay_1.length > 288) {
            array_distance_3ngay_1.shift();
        }
        if (array_distance_7ngay_1.length > 672) {
            array_distance_7ngay_1.shift();
        }
        if (array_distance_15ngay_1.length > 1440) {
            array_distance_15ngay_1.shift();
        }
    }
    // AVERGAGE
    for (let i = 0; i < array_distance_1ngay_1.length; i++) {
        avg_data_chart1_1 = array_distance_1ngay_1[i];
        array_avg_1ngay_1_0.push(avg_data_chart1_1);

        avg_1ngay_1 = array_avg_1ngay_1_0.reduce((a, b) => a + b, 0) / array_avg_1ngay_1_0.length;
        avg_1ngay_1_final = Math.round(avg_1ngay_1 * 1000) / 1000; // Làm tròn
        array_avg_1ngay_1.push(avg_1ngay_1_final);
    }

    for (let i = 0; i < array_distance_3ngay_1.length; i++) {
        avg_data_chart1_3 = array_distance_3ngay_1[i];
        array_avg_3ngay_1_0.push(avg_data_chart1_3);

        avg_3ngay_1 = array_avg_3ngay_1_0.reduce((a, b) => a + b, 0) / array_avg_3ngay_1_0.length;
        avg_3ngay_1_final = Math.round(avg_3ngay_1 * 1000) / 1000; // Làm tròn
        array_avg_3ngay_1.push(avg_3ngay_1_final);
    }

    for (let i = 0; i < array_distance_7ngay_1.length; i++) {
        avg_data_chart1_7 = array_distance_7ngay_1[i];
        array_avg_7ngay_1_0.push(avg_data_chart1_7);

        avg_7ngay_1 = array_avg_7ngay_1_0.reduce((a, b) => a + b, 0) / array_avg_7ngay_1_0.length;
        avg_7ngay_1_final = Math.round(avg_7ngay_1 * 1000) / 1000; // Làm tròn
        array_avg_7ngay_1.push(avg_7ngay_1_final);
    }

    for (let i = 0; i < array_distance_15ngay_1.length; i++) {
        avg_data_chart1_15 = array_distance_15ngay_1[i];
        array_avg_15ngay_1_0.push(avg_data_chart1_15);

        avg_15ngay_1 = array_avg_15ngay_1_0.reduce((a, b) => a + b, 0) / array_avg_15ngay_1_0.length;
        avg_15ngay_1_final = Math.round(avg_15ngay_1 * 1000) / 1000; // Làm tròn
        array_avg_15ngay_1.push(avg_15ngay_1_final);
    }
    // -----------------------------------------------------------------------------

    for (let i = 0; i < data.Items.length; i++) {
        sample_time_data_chart4 = JSON.parse(data.Items[i].sample_time);
        const time_stamp_chart4 = new Date(sample_time_data_chart4);
        min_chart4 = time_stamp_chart4.getMinutes();
        hour_chart4 = time_stamp_chart4.getHours();

        const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        date = time_stamp_chart4.getDate();
        month = month_name[time_stamp_chart4.getMonth()];
        year = time_stamp_chart4.getFullYear();

        if (min_chart4 < 10) {
            min_chart4 = '0' + min_chart4;
        }
        if (date < 10) {
            date = '0' + date;
        }
        if (month < 10) {
            month = '0' + month;
        }
        full_time_chart4 = hour_chart4 + ":" + min_chart4 + ' ' + date + "/" + month;
        array_time_live.push(full_time_chart4);

        array_time_1ngay.push(time_stamp_chart4);
        array_time_3ngay.push(time_stamp_chart4);
        array_time_7ngay.push(time_stamp_chart4);
        array_time_15ngay.push(time_stamp_chart4);

        if (array_time_1ngay.length > 96) {
            array_time_1ngay.shift();
        }
        if (array_time_3ngay.length > 288) {
            array_time_3ngay.shift();
        }
        if (array_time_7ngay.length > 672) {
            array_time_7ngay.shift();
        }
        if (array_time_15ngay.length > 1440) {
            array_time_15ngay.shift();
        }
    }
});
//---------------------------------------------------------------------------------------------------------


// Trạm 2--------------------------------------------------------------------------------------------------
docClient.query(params_chart2_4, function(err, data) {
    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart2_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_live_2.push(distance_data_chart2_4);
        array_distance_1ngay_2.push(distance_data_chart2_4);
        array_distance_3ngay_2.push(distance_data_chart2_4);
        array_distance_7ngay_2.push(distance_data_chart2_4);
        array_distance_15ngay_2.push(distance_data_chart2_4);

        avg_chart2_4 = array_distance_live_2.reduce((a, b) => a + b, 0) / array_distance_live_2.length;
        avg_chart2_4_final = Math.round(avg_chart2_4 * 100) / 100; // Làm tròn
        array_avg_live_2.push(avg_chart2_4_final);

        if (array_distance_1ngay_2.length > 96) {
            array_distance_1ngay_2.shift();
        }
        if (array_distance_3ngay_2.length > 288) {
            array_distance_3ngay_2.shift();
        }
        if (array_distance_7ngay_2.length > 672) {
            array_distance_7ngay_2.shift();
        }
        if (array_distance_15ngay_2.length > 1440) {
            array_distance_15ngay_2.shift();
        }
    }
    // AVERGAGE
    for (let i = 0; i < array_distance_1ngay_2.length; i++) {
        avg_data_chart2_1 = array_distance_1ngay_2[i];
        array_avg_1ngay_2_0.push(avg_data_chart2_1);

        avg_1ngay_2 = array_avg_1ngay_2_0.reduce((a, b) => a + b, 0) / array_avg_1ngay_2_0.length;
        avg_1ngay_2_final = Math.round(avg_1ngay_2 * 1000) / 1000; // Làm tròn
        array_avg_1ngay_2.push(avg_1ngay_2_final);
    }

    for (let i = 0; i < array_distance_3ngay_2.length; i++) {
        avg_data_chart2_3 = array_distance_3ngay_2[i];
        array_avg_3ngay_2_0.push(avg_data_chart2_3);

        avg_3ngay_2 = array_avg_3ngay_2_0.reduce((a, b) => a + b, 0) / array_avg_3ngay_2_0.length;
        avg_3ngay_2_final = Math.round(avg_3ngay_2 * 1000) / 1000; // Làm tròn
        array_avg_3ngay_2.push(avg_3ngay_2_final);
    }

    for (let i = 0; i < array_distance_7ngay_2.length; i++) {
        avg_data_chart2_7 = array_distance_7ngay_2[i];
        array_avg_7ngay_2_0.push(avg_data_chart2_7);

        avg_7ngay_2 = array_avg_7ngay_2_0.reduce((a, b) => a + b, 0) / array_avg_7ngay_2_0.length;
        avg_7ngay_2_final = Math.round(avg_7ngay_2 * 1000) / 1000; // Làm tròn
        array_avg_7ngay_2.push(avg_7ngay_2_final);
    }

    for (let i = 0; i < array_distance_15ngay_2.length; i++) {
        avg_data_chart2_15 = array_distance_15ngay_2[i];
        array_avg_15ngay_2_0.push(avg_data_chart2_15);

        avg_15ngay_2 = array_avg_15ngay_2_0.reduce((a, b) => a + b, 0) / array_avg_15ngay_2_0.length;
        avg_15ngay_2_final = Math.round(avg_15ngay_2 * 1000) / 1000; // Làm tròn
        array_avg_15ngay_2.push(avg_15ngay_2_final);
    }
});
//---------------------------------------------------------------------------------------------------------


// Trạm 3--------------------------------------------------------------------------------------------------
docClient.query(params_chart3_4, function(err, data) {
    for (let i = 0; i < data.Items.length; i++) {
        distance_data_chart3_4 = JSON.parse(data.Items[i].device_data.Distance);
        array_distance_live_3.push(distance_data_chart3_4);
        array_distance_1ngay_3.push(distance_data_chart3_4);
        array_distance_3ngay_3.push(distance_data_chart3_4);
        array_distance_7ngay_3.push(distance_data_chart3_4);
        array_distance_15ngay_3.push(distance_data_chart3_4);

        avg_chart3_4 = array_distance_live_3.reduce((a, b) => a + b, 0) / array_distance_live_3.length;
        avg_chart3_4_final = Math.round(avg_chart3_4 * 100) / 100; // Làm tròn
        array_avg_live_3.push(avg_chart3_4_final);

        if (array_distance_1ngay_3.length > 96) {
            array_distance_1ngay_3.shift();
        }
        if (array_distance_3ngay_3.length > 288) {
            array_distance_3ngay_3.shift();
        }
        if (array_distance_7ngay_3.length > 672) {
            array_distance_7ngay_3.shift();
        }
        if (array_distance_15ngay_3.length > 1440) {
            array_distance_15ngay_3.shift();
        }
    }
    // AVERGAGE
    for (let i = 0; i < array_distance_1ngay_3.length; i++) {
        avg_data_chart3_1 = array_distance_1ngay_3[i];
        array_avg_1ngay_3_0.push(avg_data_chart3_1);

        avg_1ngay_3 = array_avg_1ngay_3_0.reduce((a, b) => a + b, 0) / array_avg_1ngay_3_0.length;
        avg_1ngay_3_final = Math.round(avg_1ngay_3 * 1000) / 1000; // Làm tròn
        array_avg_1ngay_3.push(avg_1ngay_3_final);
    }

    for (let i = 0; i < array_distance_3ngay_3.length; i++) {
        avg_data_chart3_3 = array_distance_3ngay_3[i];
        array_avg_3ngay_3_0.push(avg_data_chart3_3);

        avg_3ngay_3 = array_avg_3ngay_3_0.reduce((a, b) => a + b, 0) / array_avg_3ngay_3_0.length;
        avg_3ngay_3_final = Math.round(avg_3ngay_3 * 1000) / 1000; // Làm tròn
        array_avg_3ngay_3.push(avg_3ngay_3_final);
    }

    for (let i = 0; i < array_distance_7ngay_3.length; i++) {
        avg_data_chart3_7 = array_distance_7ngay_3[i];
        array_avg_7ngay_3_0.push(avg_data_chart3_7);

        avg_7ngay_3 = array_avg_7ngay_3_0.reduce((a, b) => a + b, 0) / array_avg_7ngay_3_0.length;
        avg_7ngay_3_final = Math.round(avg_7ngay_3 * 1000) / 1000; // Làm tròn
        array_avg_7ngay_3.push(avg_7ngay_3_final);
    }

    for (let i = 0; i < array_distance_15ngay_3.length; i++) {
        avg_data_chart3_15 = array_distance_15ngay_3[i];
        array_avg_15ngay_3_0.push(avg_data_chart3_15);

        avg_15ngay_3 = array_avg_15ngay_3_0.reduce((a, b) => a + b, 0) / array_avg_15ngay_3_0.length;
        avg_15ngay_3_final = Math.round(avg_15ngay_3 * 1000) / 1000; // Làm tròn
        array_avg_15ngay_3.push(avg_15ngay_3_final);
    }
});
//----------------------------------------------------------------------------------------------------------

function showChart() {
    live_x = array_time_live;
    x_length_4 = array_time_live.length;
    const x_labels_4 = live_x.map(label => label.split(' '));

    const ctx = document.getElementById("chart-4").getContext("2d");
    myChart = new Chart(ctx, {
        data: {
            labels: x_labels_4,
            datasets: [{ //0
                    type: "line",
                    label: "Trạm 1",
                    data: array_distance_live_1,
                    backgroundColor: "red",
                    borderColor: "red",
                    borderWidth: 3,
                    cubicInterpolationMode: 'monotone',
                    pointStyle: 'rect',
                    hoverRadius: 8,
                    pointRadius: 0
                },
                { //1
                    type: "line",
                    label: "Trạm 2",
                    data: array_distance_live_2,
                    backgroundColor: "blue",
                    borderColor: "blue",
                    borderWidth: 3,
                    cubicInterpolationMode: 'monotone',
                    pointStyle: 'rect',
                    hoverRadius: 8,
                    pointRadius: 0
                },
                { //2
                    type: "line",
                    label: "Trạm 3",
                    data: array_distance_live_3,
                    backgroundColor: "green",
                    borderColor: "green",
                    borderWidth: 3,
                    cubicInterpolationMode: 'monotone',
                    pointStyle: 'rect',
                    hoverRadius: 8,
                    pointRadius: 0
                },
                { //3
                    type: "line",
                    label: "TB Trạm 1",
                    data: array_avg_live_1,
                    backgroundColor: 'white',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 3,
                    borderDash: [10, 8.3],
                    hidden: true,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0, // xóa dot
                    pointStyle: 'rect',
                    hoverRadius: 8,
                },
                { //4
                    type: "line",
                    label: "TB Trạm 2",
                    data: array_avg_live_2,
                    backgroundColor: 'white',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 3,
                    borderDash: [10, 8.3],
                    hidden: true,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0, // xóa dot
                    pointStyle: 'rect',
                    hoverRadius: 8,
                },
                { //5
                    type: "line",
                    label: "TB Trạm 3",
                    data: array_avg_live_3,
                    backgroundColor: 'white',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 3,
                    borderDash: [10, 8.3],
                    hidden: true,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0, // xóa dot
                    pointStyle: 'rect',
                    hoverRadius: 8,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    min: x_length_4 - 52,
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
            onHover: (event, chartElement) => {
                event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
            },
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        padding: 15,
                        font: {
                            size: 14,
                        },
                        color: 'black',
                        boxWidth: 50,
                        boxHeight: 1.5
                    },

                },
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
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
    x_length_4 = array_time_live.length;
    const startScale = myChart.options.scales.x.min + start;
    const endScale = myChart.options.scales.x.max + end;

    // possition by defaut if
    myChart.options.scales.x.min = startScale;
    myChart.options.scales.x.max = endScale;
    document.getElementById('previous').disabled = false;
    document.getElementById('next').disabled = false;

    if (endScale > x_length_4) {
        myChart.options.scales.x.min = x_length_4 - 52;
        myChart.options.scales.x.max = x_length_4 - 1;
        document.getElementById('next').disabled = true;
    };

    if (startScale < 0) {
        myChart.options.scales.x.min = 0;
        myChart.options.scales.x.max = 51;
        document.getElementById('previous').disabled = true;
    };
    myChart.update();
}
setTimeout(showChart, 500);

// RESET CHART
function resetData() {
    x_length_4 = array_time_live.length;
    live_x = array_time_live;
    const x_labels_4 = live_x.map(label => label.split(' '));
    var x_scale_live = {
        min: x_length_4 - 52,
        max: x_length_4,
        ticks: {
            color: 'black'
        },
    };
    myChart.data.datasets[0].data = array_distance_live_1;
    myChart.data.datasets[1].data = array_distance_live_2;
    myChart.data.datasets[2].data = array_distance_live_3;
    myChart.data.datasets[3].data = array_avg_live_1;
    myChart.data.datasets[4].data = array_avg_live_2;
    myChart.data.datasets[5].data = array_avg_live_3;
    myChart.data.labels = x_labels_4;
    myChart.options.scales.x = x_scale_live
    myChart.update();
};

// Change chart
change_chart.addEventListener('change', change_data);

function change_data() {
    live_x = array_time_live;
    live_x_length = array_time_live.length;
    const x_labels_4 = live_x.map(label => label.split(' '));

    var x_scale_live = {
        min: live_x_length - 52,
        max: live_x_length,
        ticks: {
            color: 'black'
        },
    };

    var x_scale_hour = {
        type: 'time',
        time: {
            unit: 'hour',
        },
        ticks: {
            color: 'black'
        },
    };

    var x_scale_day = {
        type: 'time',
        time: {
            unit: 'day',
        },
        ticks: {
            color: 'black'
        },
    };

    const change_value = document.getElementById('change_chart').value;
    if (change_value == 'live') {
        myChart.data.datasets[0].data = array_distance_live_1;
        myChart.data.datasets[1].data = array_distance_live_2;
        myChart.data.datasets[2].data = array_distance_live_3;
        myChart.data.datasets[3].data = array_avg_live_1;
        myChart.data.datasets[4].data = array_avg_live_2;
        myChart.data.datasets[5].data = array_avg_live_3;
        myChart.data.labels = x_labels_4;
        myChart.options.scales.x = x_scale_live;
    }
    if (change_value == '1-ngay') {
        myChart.data.datasets[0].data = array_distance_1ngay_1;
        myChart.data.datasets[1].data = array_distance_1ngay_2;
        myChart.data.datasets[2].data = array_distance_1ngay_3;
        myChart.data.datasets[3].data = array_avg_1ngay_1;
        myChart.data.datasets[4].data = array_avg_1ngay_2;
        myChart.data.datasets[5].data = array_avg_1ngay_3;
        myChart.data.labels = array_time_1ngay;
        myChart.options.scales.x = x_scale_hour;
    }
    if (change_value == '3-ngay') {
        myChart.data.datasets[0].data = array_distance_3ngay_1;
        myChart.data.datasets[1].data = array_distance_3ngay_2;
        myChart.data.datasets[2].data = array_distance_3ngay_3;
        myChart.data.datasets[3].data = array_avg_3ngay_1;
        myChart.data.datasets[4].data = array_avg_3ngay_2;
        myChart.data.datasets[5].data = array_avg_3ngay_3;
        myChart.data.labels = array_time_3ngay;
        myChart.options.scales.x = x_scale_day;
    }
    if (change_value == '7-ngay') {
        myChart.data.datasets[0].data = array_distance_7ngay_1;
        myChart.data.datasets[1].data = array_distance_7ngay_2;
        myChart.data.datasets[2].data = array_distance_7ngay_3;
        myChart.data.datasets[3].data = array_avg_7ngay_1;
        myChart.data.datasets[4].data = array_avg_7ngay_2;
        myChart.data.datasets[5].data = array_avg_7ngay_3;
        myChart.data.labels = array_time_7ngay;
        myChart.options.scales.x = x_scale_day;
    }
    if (change_value == '15-ngay') {
        myChart.data.datasets[0].data = array_distance_15ngay_1;
        myChart.data.datasets[1].data = array_distance_15ngay_2;
        myChart.data.datasets[2].data = array_distance_15ngay_3;
        myChart.data.datasets[3].data = array_avg_15ngay_1;
        myChart.data.datasets[4].data = array_avg_15ngay_2;
        myChart.data.datasets[5].data = array_avg_15ngay_3;
        myChart.data.labels = array_time_15ngay;
        myChart.options.scales.x = x_scale_day;
    }
    myChart.update();
}