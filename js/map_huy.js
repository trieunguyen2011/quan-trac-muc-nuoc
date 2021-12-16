function initMap() {
    var array_distance_chart1 = new Array();
    var array_distance_chart2 = new Array();
    var array_distance_chart3 = new Array();
    var lat_1_data, lng_1_data, lat_2_data, lng_2_data, lat_3_data, lng_3_data;

    var params_map1 = {
        TableName: "gps_water_level",
        KeyConditionExpression: "device_id = :a",
        ExpressionAttributeValues: {
            ":a": 1,
        },
    };
    var params_map2 = {
        TableName: "gps_water_level",
        KeyConditionExpression: "device_id = :a",
        ExpressionAttributeValues: {
            ":a": 2,
        },
    };
    var params_map3 = {
        TableName: "gps_water_level",
        KeyConditionExpression: "device_id = :a",
        ExpressionAttributeValues: {
            ":a": 3,
        },
    };

    AWS.config.update({
        region: "ap-northeast-1",
        endpoint: "http://dynamodb.ap-northeast-1.amazonaws.com",
        accessKeyId: "AKIAXKZISWAEZWPSCIVL",
        secretAccessKey: "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",
    });

    // Thiết lập ban đầu
    var options = {
        center: { lat: 9.281294, lng: 105.721824 },
        zoom: 16,
        controls: true,
        marker: true,
        userInteractionEnabled: true,

    };
    var map = new map4d.Map(document.getElementById("map"), options);
    // map.setPOIsEnabled(false); //Tắt địa điểm mặc định
    //Giới hạn vùng di chuyển
    map.setRestrictionBounds(new map4d.LatLngBounds([9.362071, 105.642207, 9.191152, 105.830422]));

    //Setup marker1
    var marker1 = new map4d.Marker({
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 1",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: 9.283603, lng: 105.7234 },
        userInteractionEnabled: true

    });
    marker1.setMap(map);

    //Setup marker2
    var marker2 = new map4d.Marker({
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 2",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: 9.283539, lng: 105.717714 },

    });

    //Setup marker3
    var marker3 = new map4d.Marker({
        //Tên marker
        label: new map4d.MarkerLabel({
            text: "Trạm 3",
            color: "0000000",
            fontSize: 20,
        }),
        position: { lat: 9.278525, lng: 105.72178 },
    });

    var docClient = new AWS.DynamoDB.DocumentClient();
    docClient.query(params_chart1, function(err, data) {

        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart1 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart1.push(distance_data_chart1);
        }

        //Update value of marker
        let FinalhMarker1 = array_distance_chart1[array_distance_chart1.length - 1];
        marker1.setInfoContents("Độ cao hiện tại: " + FinalhMarker1 + "\n" + "m");
        // marker1.showInfoWindow()
        marker1.setMap(map);

    })

    docClient.query(params_chart2, function(err, data) {

        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart2 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart2.push(distance_data_chart2);
        }

        //Update value of marker
        let FinalhMarker2 = array_distance_chart2[array_distance_chart2.length - 1];
        marker2.setMap(map);
        marker2.setInfoContents("Độ cao hiện tại: " + FinalhMarker2 + "\n" + "m");
        // marker2.showInfoWindow() 

    })

    docClient.query(params_chart3, function(err, data) {
        for (let i = 0; i < data.Items.length; i++) {
            distance_data_chart3 = JSON.parse(data.Items[i].device_data.Distance);
            array_distance_chart3.push(distance_data_chart3);
        }

        //Update value of marker
        let FinalhMarker3 = array_distance_chart3[array_distance_chart3.length - 1];
        marker3.setMap(map);
        marker3.setInfoContents("Độ cao hiện tại: " + FinalhMarker3 + "\n" + "m")
    })
}