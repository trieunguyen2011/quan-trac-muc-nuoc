function fn_change() {
    var x = document.getElementById("list-tram").value;

    var array_distance_12h = new Array();
    var array_distance_1day = new Array();
    var array_distance_3day = new Array();

    var array_time_12h = new Array();
    var array_time_1day = new Array();
    var array_time_3day = new Array();

    // TRẠM 1----------------------------------------------------------------------------------
    if (x == "tram1") {
        var params_chart1 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 1,
            },
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.query(params_chart1, function(err, data) {
            // Tọa độ
            lat_data = data.Items[data.Items.length - 1].device_data.Latitude;
            lng_data = data.Items[data.Items.length - 1].device_data.Longitude;
            toa_do = lat_data + ', ' + lng_data;
            document.getElementById("toa-do").innerHTML = toa_do;

            // Hiện tại
            hien_tai = JSON.parse(data.Items[data.Items.length - 1].device_data.Distance);

            sample_time_data = JSON.parse(data.Items[data.Items.length - 1].sample_time);
            time_stamp = new Date(sample_time_data);
            min = time_stamp.getMinutes();
            hour = time_stamp.getHours();
            const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            date = time_stamp.getDate();
            month = month_name[time_stamp.getMonth()];
            year = time_stamp.getFullYear();
            time_hien_tai = hour + ":" + min + ', ' + date + "/" + month + "/" + year;

            document.getElementById("hien-tai").innerHTML = hien_tai + " cm";
            document.getElementById("time-hien-tai").innerHTML = time_hien_tai;


            // 12 GiỜ-----------------------------------------------------------------------
            for (let i = 0; i < data.Items.length; i++) {
                distance = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_12h.push(distance);
                array_distance_1day.push(distance);
                array_distance_3day.push(distance);

                sample_time_data = JSON.parse(data.Items[i].sample_time);
                time_stamp = new Date(sample_time_data);
                min = time_stamp.getMinutes();
                hour = time_stamp.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date = time_stamp.getDate();
                month = month_name[time_stamp.getMonth()];
                year = time_stamp.getFullYear();
                full_time = hour + ":" + min + ', ' + date + "/" + month + "/" + year;
                array_time_12h.push(full_time);
                array_time_1day.push(full_time);
                array_time_3day.push(full_time);

                if (array_distance_12h.length > 10) {
                    array_distance_12h.shift();
                    array_time_12h.shift();
                }

                if (array_distance_1day.length > 20) {
                    array_distance_1day.shift();
                    array_time_1day.shift();
                }

                if (array_distance_3day.length > 30) {
                    array_distance_3day.shift();
                    array_time_3day.shift();
                }
            }
            // Lớn nhẩt
            max_12h = 0;
            for (let i = 0; i < array_distance_12h.length; i++) {
                if (array_distance_12h[i] > max_12h) {
                    max_12h = array_distance_12h[i];
                    time_max_12h = array_time_12h[i];
                }
            }
            document.getElementById("max-12h").innerHTML = max_12h + " cm";
            document.getElementById("time-max-12h").innerHTML = time_max_12h;

            // Nhỏ nhất
            min_12h = max_12h;
            for (let i = 0; i < array_distance_12h.length; i++) {
                if (array_distance_12h[i] < min_12h) {
                    min_12h = array_distance_12h[i];
                    time_min_12h = array_time_12h[i];
                }
            }
            document.getElementById("min-12h").innerHTML = min_12h + " cm";
            document.getElementById("time-min-12h").innerHTML = time_min_12h;

            // Trung bình   
            avg_12h = array_distance_12h = array_distance_12h.reduce((a, b) => a + b, 0) / array_distance_12h.length;
            avg_12h_final = Math.round(avg_12h * 100) / 100; // Làm tròn
            document.getElementById("average-12h").innerHTML = avg_12h_final + " cm";
            // ------------------------------------------------------------------------------------------

            // 1 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_1day = 0;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] > max_1day) {
                    max_1day = array_distance_1day[i];
                    time_max_1day = array_time_1day[i];
                }
            }
            document.getElementById("max-1day").innerHTML = max_1day + " cm";
            document.getElementById("time-max-1day").innerHTML = time_max_1day;

            // Nhỏ nhất
            min_1day = max_1day;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] < min_1day) {
                    min_1day = array_distance_1day[i];
                    time_min_1day = array_time_1day[i];
                }
            }
            document.getElementById("min-1day").innerHTML = min_1day + " cm";
            document.getElementById("time-min-1day").innerHTML = time_min_1day;

            // Trung bình   
            avg_1day = array_distance_1day = array_distance_1day.reduce((a, b) => a + b, 0) / array_distance_1day.length;
            avg_1day_final = Math.round(avg_1day * 100) / 100; // Làm tròn
            document.getElementById("average-1day").innerHTML = avg_1day_final + " cm";
            // ------------------------------------------------------------------------------------------

            // 3 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_3day = 0;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] > max_3day) {
                    max_3day = array_distance_3day[i];
                    time_max_3day = array_time_3day[i];
                }
            }
            document.getElementById("max-3day").innerHTML = max_3day + " cm";
            document.getElementById("time-max-3day").innerHTML = time_max_3day;

            // Nhỏ nhất
            min_3day = max_3day;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] < min_3day) {
                    min_3day = array_distance_3day[i];
                    time_min_3day = array_time_3day[i];
                }
            }
            document.getElementById("min-3day").innerHTML = min_3day + " cm";
            document.getElementById("time-min-3day").innerHTML = time_min_3day;

            // Trung bình   
            avg_3day = array_distance_3day = array_distance_3day.reduce((a, b) => a + b, 0) / array_distance_3day.length;
            avg_3day_final = Math.round(avg_3day * 100) / 100; // Làm tròn
            document.getElementById("average-3day").innerHTML = avg_3day_final + " cm";
        })


        // TRẠM 2----------------------------------------------------------------------------------
    } else if (x == "tram2") {
        var params_chart2 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 2,
            },
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.query(params_chart2, function(err, data) {
            // Tọa độ
            lat_data = data.Items[data.Items.length - 1].device_data.Latitude;
            lng_data = data.Items[data.Items.length - 1].device_data.Longitude;
            toa_do = lat_data + ', ' + lng_data;
            document.getElementById("toa-do").innerHTML = toa_do;

            // Hiện tại
            hien_tai = JSON.parse(data.Items[data.Items.length - 1].device_data.Distance);

            sample_time_data = JSON.parse(data.Items[data.Items.length - 1].sample_time);
            time_stamp = new Date(sample_time_data);
            min = time_stamp.getMinutes();
            hour = time_stamp.getHours();
            const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            date = time_stamp.getDate();
            month = month_name[time_stamp.getMonth()];
            year = time_stamp.getFullYear();
            time_hien_tai = hour + ":" + min + ', ' + date + "/" + month + "/" + year;

            document.getElementById("hien-tai").innerHTML = hien_tai + " cm";
            document.getElementById("time-hien-tai").innerHTML = time_hien_tai;


            // 12 GiỜ-----------------------------------------------------------------------
            for (let i = 0; i < data.Items.length; i++) {
                distance = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_12h.push(distance);
                array_distance_1day.push(distance);
                array_distance_3day.push(distance);

                sample_time_data = JSON.parse(data.Items[i].sample_time);
                time_stamp = new Date(sample_time_data);
                min = time_stamp.getMinutes();
                hour = time_stamp.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date = time_stamp.getDate();
                month = month_name[time_stamp.getMonth()];
                year = time_stamp.getFullYear();
                full_time = hour + ":" + min + ', ' + date + "/" + month + "/" + year;
                array_time_12h.push(full_time);
                array_time_1day.push(full_time);
                array_time_3day.push(full_time);

                if (array_distance_12h.length > 10) {
                    array_distance_12h.shift();
                    array_time_12h.shift();
                }

                if (array_distance_1day.length > 20) {
                    array_distance_1day.shift();
                    array_time_1day.shift();
                }

                if (array_distance_3day.length > 30) {
                    array_distance_3day.shift();
                    array_time_3day.shift();
                }
            }
            // Lớn nhẩt
            max_12h = 0;
            for (let i = 0; i < array_distance_12h.length; i++) {
                if (array_distance_12h[i] > max_12h) {
                    max_12h = array_distance_12h[i];
                    time_max_12h = array_time_12h[i];
                }
            }
            document.getElementById("max-12h").innerHTML = max_12h + " cm";
            document.getElementById("time-max-12h").innerHTML = time_max_12h;

            // Nhỏ nhất
            min_12h = max_12h;
            for (let i = 0; i < array_distance_12h.length; i++) {
                if (array_distance_12h[i] < min_12h) {
                    min_12h = array_distance_12h[i];
                    time_min_12h = array_time_12h[i];
                }
            }
            document.getElementById("min-12h").innerHTML = min_12h + " cm";
            document.getElementById("time-min-12h").innerHTML = time_min_12h;

            // Trung bình   
            avg_12h = array_distance_12h = array_distance_12h.reduce((a, b) => a + b, 0) / array_distance_12h.length;
            avg_12h_final = Math.round(avg_12h * 100) / 100; // Làm tròn
            document.getElementById("average-12h").innerHTML = avg_12h_final + " cm";
            // ------------------------------------------------------------------------------------------

            // 1 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_1day = 0;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] > max_1day) {
                    max_1day = array_distance_1day[i];
                    time_max_1day = array_time_1day[i];
                }
            }
            document.getElementById("max-1day").innerHTML = max_1day + " cm";
            document.getElementById("time-max-1day").innerHTML = time_max_1day;

            // Nhỏ nhất
            min_1day = max_1day;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] < min_1day) {
                    min_1day = array_distance_1day[i];
                    time_min_1day = array_time_1day[i];
                }
            }
            document.getElementById("min-1day").innerHTML = min_1day + " cm";
            document.getElementById("time-min-1day").innerHTML = time_min_1day;

            // Trung bình   
            avg_1day = array_distance_1day = array_distance_1day.reduce((a, b) => a + b, 0) / array_distance_1day.length;
            avg_1day_final = Math.round(avg_1day * 100) / 100; // Làm tròn
            document.getElementById("average-1day").innerHTML = avg_1day_final + " cm";
            // ------------------------------------------------------------------------------------------

            // 3 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_3day = 0;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] > max_3day) {
                    max_3day = array_distance_3day[i];
                    time_max_3day = array_time_3day[i];
                }
            }
            document.getElementById("max-3day").innerHTML = max_3day + " cm";
            document.getElementById("time-max-3day").innerHTML = time_max_3day;

            // Nhỏ nhất
            min_3day = max_3day;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] < min_3day) {
                    min_3day = array_distance_3day[i];
                    time_min_3day = array_time_3day[i];
                }
            }
            document.getElementById("min-3day").innerHTML = min_3day + " cm";
            document.getElementById("time-min-3day").innerHTML = time_min_3day;

            // Trung bình   
            avg_3day = array_distance_3day = array_distance_3day.reduce((a, b) => a + b, 0) / array_distance_3day.length;
            avg_3day_final = Math.round(avg_3day * 100) / 100; // Làm tròn
            document.getElementById("average-3day").innerHTML = avg_3day_final + " cm";
        })

        //TRẠM 3------------------------------------------------------------------------------------
    } else if (x == "tram3") {
        var params_chart3 = {
            TableName: "water_level",
            KeyConditionExpression: "device_id = :a",
            ExpressionAttributeValues: {
                ":a": 3,
            },
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.query(params_chart3, function(err, data) {
            // Tọa độ
            lat_data = data.Items[data.Items.length - 1].device_data.Latitude;
            lng_data = data.Items[data.Items.length - 1].device_data.Longitude;
            toa_do = lat_data + ', ' + lng_data;
            document.getElementById("toa-do").innerHTML = toa_do;

            // Hiện tại
            hien_tai = JSON.parse(data.Items[data.Items.length - 1].device_data.Distance);

            sample_time_data = JSON.parse(data.Items[data.Items.length - 1].sample_time);
            time_stamp = new Date(sample_time_data);
            min = time_stamp.getMinutes();
            hour = time_stamp.getHours();
            const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
            date = time_stamp.getDate();
            month = month_name[time_stamp.getMonth()];
            year = time_stamp.getFullYear();
            time_hien_tai = hour + ":" + min + ', ' + date + "/" + month + "/" + year;

            document.getElementById("hien-tai").innerHTML = hien_tai + " cm";
            document.getElementById("time-hien-tai").innerHTML = time_hien_tai;


            // 12 GiỜ-----------------------------------------------------------------------
            for (let i = 0; i < data.Items.length; i++) {
                distance = JSON.parse(data.Items[i].device_data.Distance);
                array_distance_12h.push(distance);
                array_distance_1day.push(distance);
                array_distance_3day.push(distance);

                sample_time_data = JSON.parse(data.Items[i].sample_time);
                time_stamp = new Date(sample_time_data);
                min = time_stamp.getMinutes();
                hour = time_stamp.getHours();
                const month_name = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
                date = time_stamp.getDate();
                month = month_name[time_stamp.getMonth()];
                year = time_stamp.getFullYear();
                full_time = hour + ":" + min + ', ' + date + "/" + month + "/" + year;
                array_time_12h.push(full_time);
                array_time_1day.push(full_time);
                array_time_3day.push(full_time);

                if (array_distance_12h.length > 10) {
                    array_distance_12h.shift();
                    array_time_12h.shift();
                }

                if (array_distance_1day.length > 20) {
                    array_distance_1day.shift();
                    array_time_1day.shift();
                }

                if (array_distance_3day.length > 30) {
                    array_distance_3day.shift();
                    array_time_3day.shift();
                }
            }
            // Lớn nhẩt
            max_12h = 0;
            for (let i = 0; i < array_distance_12h.length; i++) {
                if (array_distance_12h[i] > max_12h) {
                    max_12h = array_distance_12h[i];
                    time_max_12h = array_time_12h[i];
                }
            }
            document.getElementById("max-12h").innerHTML = max_12h + " cm";
            document.getElementById("time-max-12h").innerHTML = time_max_12h;

            // Nhỏ nhất
            min_12h = max_12h;
            for (let i = 0; i < array_distance_12h.length; i++) {
                if (array_distance_12h[i] < min_12h) {
                    min_12h = array_distance_12h[i];
                    time_min_12h = array_time_12h[i];
                }
            }
            document.getElementById("min-12h").innerHTML = min_12h + " cm";
            document.getElementById("time-min-12h").innerHTML = time_min_12h;

            // Trung bình   
            avg_12h = array_distance_12h = array_distance_12h.reduce((a, b) => a + b, 0) / array_distance_12h.length;
            avg_12h_final = Math.round(avg_12h * 100) / 100; // Làm tròn
            document.getElementById("average-12h").innerHTML = avg_12h_final + " cm";
            // ------------------------------------------------------------------------------------------

            // 1 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_1day = 0;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] > max_1day) {
                    max_1day = array_distance_1day[i];
                    time_max_1day = array_time_1day[i];
                }
            }
            document.getElementById("max-1day").innerHTML = max_1day + " cm";
            document.getElementById("time-max-1day").innerHTML = time_max_1day;

            // Nhỏ nhất
            min_1day = max_1day;
            for (let i = 0; i < array_distance_1day.length; i++) {
                if (array_distance_1day[i] < min_1day) {
                    min_1day = array_distance_1day[i];
                    time_min_1day = array_time_1day[i];
                }
            }
            document.getElementById("min-1day").innerHTML = min_1day + " cm";
            document.getElementById("time-min-1day").innerHTML = time_min_1day;

            // Trung bình   
            avg_1day = array_distance_1day = array_distance_1day.reduce((a, b) => a + b, 0) / array_distance_1day.length;
            avg_1day_final = Math.round(avg_1day * 100) / 100; // Làm tròn
            document.getElementById("average-1day").innerHTML = avg_1day_final + " cm";
            // ------------------------------------------------------------------------------------------

            // 3 NGÀY------------------------------------------------------------------------------------
            // Lớn nhẩt
            max_3day = 0;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] > max_3day) {
                    max_3day = array_distance_3day[i];
                    time_max_3day = array_time_3day[i];
                }
            }
            document.getElementById("max-3day").innerHTML = max_3day + " cm";
            document.getElementById("time-max-3day").innerHTML = time_max_3day;

            // Nhỏ nhất
            min_3day = max_3day;
            for (let i = 0; i < array_distance_3day.length; i++) {
                if (array_distance_3day[i] < min_3day) {
                    min_3day = array_distance_3day[i];
                    time_min_3day = array_time_3day[i];
                }
            }
            document.getElementById("min-3day").innerHTML = min_3day + " cm";
            document.getElementById("time-min-3day").innerHTML = time_min_3day;

            // Trung bình   
            avg_3day = array_distance_3day = array_distance_3day.reduce((a, b) => a + b, 0) / array_distance_3day.length;
            avg_3day_final = Math.round(avg_3day * 100) / 100; // Làm tròn
            document.getElementById("average-3day").innerHTML = avg_3day_final + " cm";
        })
    }
}