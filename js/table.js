function fn_change() {
    var x = document.getElementById("list-tram").value;

    AWS.config.update({
        region: "ap-northeast-1",
        endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
        accessKeyId: "AKIAXKZISWAEZWPSCIVL",
        secretAccessKey: "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",
    });

    // TRẠM 1----------------------------------------------------------------------------------
    if (x == "tram1") {
        var array_distance_chart1 = new Array();
        var array_full_time_chart1 = new Array();
        var array_avg_chart1 = new Array();
        // var array_distance_min_chart1 = new Array();

        var params_chart1 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 1,
            },
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.query(params_chart1, function(err, data) {
            // Hiện tại
            for (let i = 0; i < data.Items.length; i++) {
                distance_data_chart1 = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_chart1.push(distance_data_chart1);
                if (array_distance_chart1.length > 10) {
                    array_distance_chart1.shift();
                }
            }
            for (let i = 0; i < data.Items.length; i++) {
                sample_time_data_chart1 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart1 = new Date(sample_time_data_chart1);
                min_chart1 = time_stamp_chart1.getMinutes();
                hour_chart1 = time_stamp_chart1.getHours();

                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart1 = time_stamp_chart1.getDate();
                month_chart1 = month_name[time_stamp_chart1.getMonth()];
                year_chart1 = time_stamp_chart1.getFullYear();
                full_time_chart1 = hour_chart1 + ":" + min_chart1 + ', ' + date_chart1 + "/" + month_chart1 + "/" + year_chart1;
                array_full_time_chart1.push(full_time_chart1);

                if (array_full_time_chart1.length > 10) {
                    array_full_time_chart1.shift();
                }
            }
            hien_tai = array_distance_chart1[9];
            time_hien_tai = array_full_time_chart1[9];
            max_hien_tai = Math.max(array_distance_chart1[0, 9]);
            document.getElementById("hien-tai").innerHTML = hien_tai + "cm";
            document.getElementById("time-hien-tai").innerHTML = time_hien_tai;



            // Lớn nhẩt
            max_chart1 = 0;
            for (let i = 0; i < data.Items.length; i++) {
                distance_chart1 = JSON.parse(data.Items[i].device_data.Distance);
                // array_distance_chart1.push(distance_chart1);

                sample_time_data_chart1 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart1 = new Date(sample_time_data_chart1);
                min_chart1 = time_stamp_chart1.getMinutes();
                hour_chart1 = time_stamp_chart1.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart1 = time_stamp_chart1.getDate();
                month_chart1 = month_name[time_stamp_chart1.getMonth()];
                year_chart1 = time_stamp_chart1.getFullYear();
                full_time_chart1 = hour_chart1 + ":" + min_chart1 + ', ' + date_chart1 + "/" + month_chart1 + "/" + year_chart1;
                // array_full_time_chart1.push(full_time_chart1);

                if (distance_chart1 > max_chart1) {
                    max_chart1 = distance_chart1;
                    time_max_chart1 = full_time_chart1;
                }
            }

            document.getElementById("max").innerHTML = max_chart1 + "cm";
            document.getElementById("time-max").innerHTML = time_max_chart1;


            // Nhỏ nhất
            min_distance_chart1 = max_chart1;
            for (let i = 0; i < data.Items.length; i++) {
                distance_chart1 = JSON.parse(data.Items[i].device_data.Distance);
                // array_distance_chart1.push(distance_chart1);

                sample_time_data_chart1 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart1 = new Date(sample_time_data_chart1);
                min_chart1 = time_stamp_chart1.getMinutes();
                hour_chart1 = time_stamp_chart1.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart1 = time_stamp_chart1.getDate();
                month_chart1 = month_name[time_stamp_chart1.getMonth()];
                year_chart1 = time_stamp_chart1.getFullYear();
                full_time_chart1 = hour_chart1 + ":" + min_chart1 + ', ' + date_chart1 + "/" + month_chart1 + "/" + year_chart1;
                // array_full_time_chart1.push(full_time_chart1);

                if (distance_chart1 < min_distance_chart1) {
                    min_distance_chart1 = distance_chart1;
                    time_min_chart1 = full_time_chart1;
                }
            }

            document.getElementById("min").innerHTML = min_distance_chart1 + "cm";
            document.getElementById("time-min").innerHTML = time_min_chart1;


            // Trung bình
            for (let i = 0; i < data.Items.length; i++) {
                distance_data_chart1 = JSON.parse(data.Items[i].device_data.Distance);
                array_avg_chart1.push(distance_data_chart1);
            }
            avg_chart1 = array_avg_chart1 = array_avg_chart1.reduce((a, b) => a + b, 0) / array_avg_chart1.length;
            // console.log(avg_chart1)
            avg_chart1_final = Math.round(avg_chart1 * 100) / 100; // Làm tròn
            // console.log(avg_chart1_new)
            document.getElementById("average").innerHTML = avg_chart1_final + "cm";

        })


        // TRẠM 2----------------------------------------------------------------------------------
    } else if (x == "tram2") {
        document.getElementById("hien-tai").innerHTML = "Trạm 2";
        var array_distance_chart2 = new Array();
        var array_full_time_chart2 = new Array();
        var array_avg_chart2 = new Array();
        // var array_distance_min_chart2 = new Array();

        var params_chart2 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 2,
            },
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.query(params_chart2, function(err, data) {
            // Hiện tại
            for (let i = 0; i < data.Items.length; i++) {
                distance_data_chart2 = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_chart2.push(distance_data_chart2);
                if (array_distance_chart2.length > 10) {
                    array_distance_chart2.shift();
                }
            }
            for (let i = 0; i < data.Items.length; i++) {
                sample_time_data_chart2 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart2 = new Date(sample_time_data_chart2);
                min_chart2 = time_stamp_chart2.getMinutes();
                hour_chart2 = time_stamp_chart2.getHours();

                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart2 = time_stamp_chart2.getDate();
                month_chart2 = month_name[time_stamp_chart2.getMonth()];
                year_chart2 = time_stamp_chart2.getFullYear();
                full_time_chart2 = hour_chart2 + ":" + min_chart2 + ', ' + date_chart2 + "/" + month_chart2 + "/" + year_chart2;
                array_full_time_chart2.push(full_time_chart2);

                if (array_full_time_chart2.length > 10) {
                    array_full_time_chart2.shift();
                }
            }
            hien_tai = array_distance_chart2[9];
            time_hien_tai = array_full_time_chart2[9];
            max_hien_tai = Math.max(array_distance_chart2[0, 9]);
            document.getElementById("hien-tai").innerHTML = hien_tai + "cm";
            document.getElementById("time-hien-tai").innerHTML = time_hien_tai;



            // Lớn nhẩt
            max_chart2 = 0;
            for (let i = 0; i < data.Items.length; i++) {
                distance_chart2 = JSON.parse(data.Items[i].device_data.Distance);
                // array_distance_chart2.push(distance_chart2);

                sample_time_data_chart2 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart2 = new Date(sample_time_data_chart2);
                min_chart2 = time_stamp_chart2.getMinutes();
                hour_chart2 = time_stamp_chart2.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart2 = time_stamp_chart2.getDate();
                month_chart2 = month_name[time_stamp_chart2.getMonth()];
                year_chart2 = time_stamp_chart2.getFullYear();
                full_time_chart2 = hour_chart2 + ":" + min_chart2 + ', ' + date_chart2 + "/" + month_chart2 + "/" + year_chart2;
                // array_full_time_chart2.push(full_time_chart2);

                if (distance_chart2 > max_chart2) {
                    max_chart2 = distance_chart2;
                    time_max_chart2 = full_time_chart2;
                }
            }

            document.getElementById("max").innerHTML = max_chart2 + "cm";
            document.getElementById("time-max").innerHTML = time_max_chart2;


            // Nhỏ nhất
            min_distance_chart2 = max_chart2;
            for (let i = 0; i < data.Items.length; i++) {
                distance_chart2 = JSON.parse(data.Items[i].device_data.Distance);
                // array_distance_chart2.push(distance_chart2);

                sample_time_data_chart2 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart2 = new Date(sample_time_data_chart2);
                min_chart2 = time_stamp_chart2.getMinutes();
                hour_chart2 = time_stamp_chart2.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart2 = time_stamp_chart2.getDate();
                month_chart2 = month_name[time_stamp_chart2.getMonth()];
                year_chart2 = time_stamp_chart2.getFullYear();
                full_time_chart2 = hour_chart2 + ":" + min_chart2 + ', ' + date_chart2 + "/" + month_chart2 + "/" + year_chart2;
                // array_full_time_chart2.push(full_time_chart2);

                if (distance_chart2 < min_distance_chart2) {
                    min_distance_chart2 = distance_chart2;
                    time_min_chart2 = full_time_chart2;
                }
            }

            document.getElementById("min").innerHTML = min_distance_chart2 + "cm";
            document.getElementById("time-min").innerHTML = time_min_chart2;


            // Trung bình
            for (let i = 0; i < data.Items.length; i++) {
                distance_data_chart2 = JSON.parse(data.Items[i].device_data.Distance);
                array_avg_chart2.push(distance_data_chart2);
            }
            avg_chart2 = array_avg_chart2 = array_avg_chart2.reduce((a, b) => a + b, 0) / array_avg_chart2.length;
            // console.log(avg_chart2)
            avg_chart2_final = Math.round(avg_chart2 * 100) / 100; // Làm tròn
            // console.log(avg_chart2_new)
            document.getElementById("average").innerHTML = avg_chart2_final + "cm";

        })


        //TRẠM 3------------------------------------------------------------------------------------
    } else if (x == "tram3") {
        document.getElementById("hien-tai").innerHTML = "Trạm 3";

        var array_distance_chart3 = new Array();
        var array_full_time_chart3 = new Array();
        var array_avg_chart3 = new Array();
        // var array_distance_min_chart3 = new Array();

        var params_chart3 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 3,
            },
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.query(params_chart3, function(err, data) {
            // Hiện tại
            for (let i = 0; i < data.Items.length; i++) {
                distance_data_chart3 = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_chart3.push(distance_data_chart3);
                if (array_distance_chart3.length > 10) {
                    array_distance_chart3.shift();
                }
            }
            for (let i = 0; i < data.Items.length; i++) {
                sample_time_data_chart3 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart3 = new Date(sample_time_data_chart3);
                min_chart3 = time_stamp_chart3.getMinutes();
                hour_chart3 = time_stamp_chart3.getHours();

                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart3 = time_stamp_chart3.getDate();
                month_chart3 = month_name[time_stamp_chart3.getMonth()];
                year_chart3 = time_stamp_chart3.getFullYear();
                full_time_chart3 = hour_chart3 + ":" + min_chart3 + ', ' + date_chart3 + "/" + month_chart3 + "/" + year_chart3;
                array_full_time_chart3.push(full_time_chart3);

                if (array_full_time_chart3.length > 10) {
                    array_full_time_chart3.shift();
                }
            }
            hien_tai = array_distance_chart3[9];
            time_hien_tai = array_full_time_chart3[9];
            max_hien_tai = Math.max(array_distance_chart3[0, 9]);
            document.getElementById("hien-tai").innerHTML = hien_tai + "cm";
            document.getElementById("time-hien-tai").innerHTML = time_hien_tai;



            // Lớn nhẩt
            max_chart3 = 0;
            for (let i = 0; i < data.Items.length; i++) {
                distance_chart3 = JSON.parse(data.Items[i].device_data.Distance);
                // array_distance_chart3.push(distance_chart3);

                sample_time_data_chart3 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart3 = new Date(sample_time_data_chart3);
                min_chart3 = time_stamp_chart3.getMinutes();
                hour_chart3 = time_stamp_chart3.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart3 = time_stamp_chart3.getDate();
                month_chart3 = month_name[time_stamp_chart3.getMonth()];
                year_chart3 = time_stamp_chart3.getFullYear();
                full_time_chart3 = hour_chart3 + ":" + min_chart3 + ', ' + date_chart3 + "/" + month_chart3 + "/" + year_chart3;
                // array_full_time_chart3.push(full_time_chart3);

                if (distance_chart3 > max_chart3) {
                    max_chart3 = distance_chart3;
                    time_max_chart3 = full_time_chart3;
                }
            }

            document.getElementById("max").innerHTML = max_chart3 + "cm";
            document.getElementById("time-max").innerHTML = time_max_chart3;


            // Nhỏ nhất
            min_distance_chart3 = max_chart3;
            for (let i = 0; i < data.Items.length; i++) {
                distance_chart3 = JSON.parse(data.Items[i].device_data.Distance);
                // array_distance_chart3.push(distance_chart3);

                sample_time_data_chart3 = JSON.parse(data.Items[i].sample_time);
                time_stamp_chart3 = new Date(sample_time_data_chart3);
                min_chart3 = time_stamp_chart3.getMinutes();
                hour_chart3 = time_stamp_chart3.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date_chart3 = time_stamp_chart3.getDate();
                month_chart3 = month_name[time_stamp_chart3.getMonth()];
                year_chart3 = time_stamp_chart3.getFullYear();
                full_time_chart3 = hour_chart3 + ":" + min_chart3 + ', ' + date_chart3 + "/" + month_chart3 + "/" + year_chart3;
                // array_full_time_chart3.push(full_time_chart3);

                if (distance_chart3 < min_distance_chart3) {
                    min_distance_chart3 = distance_chart3;
                    time_min_chart3 = full_time_chart3;
                }
            }

            document.getElementById("min").innerHTML = min_distance_chart3 + "cm";
            document.getElementById("time-min").innerHTML = time_min_chart3;


            // Trung bình
            for (let i = 0; i < data.Items.length; i++) {
                distance_data_chart3 = JSON.parse(data.Items[i].device_data.Distance);
                array_avg_chart3.push(distance_data_chart3);
            }
            avg_chart3 = array_avg_chart3 = array_avg_chart3.reduce((a, b) => a + b, 0) / array_avg_chart3.length;
            // console.log(avg_chart3)
            avg_chart3_final = Math.round(avg_chart3 * 100) / 100; // Làm tròn
            // console.log(avg_chart3_new)
            document.getElementById("average").innerHTML = avg_chart3_final + "cm";

        })

    }
}