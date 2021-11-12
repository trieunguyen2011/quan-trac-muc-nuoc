var lat_1_data;
var lng_1_data;
var lat_2_data;
var lng_2_data;
var lat_3_data;
var lng_3_data;
var docClient = new AWS.DynamoDB.DocumentClient();
// Tọa độ 1
docClient.query(params_chart1, function(err, data) {
    lat_1_data = data.Items[data.Items.length - 1].device_data.Latitude;
    lng_1_data = data.Items[data.Items.length - 1].device_data.Longitude;
    // Tọa độ 2
    docClient.query(params_chart2, function(err, data) {
        lat_2_data = data.Items[data.Items.length - 1].device_data.Latitude;
        lng_2_data = data.Items[data.Items.length - 1].device_data.Longitude;
        // Tọa độ 3
        docClient.query(params_chart3, function(err, data) {
            lat_3_data = data.Items[data.Items.length - 1].device_data.Latitude;
            lng_3_data = data.Items[data.Items.length - 1].device_data.Longitude;
            initMap();

            function initMap() {
                // Thiết lập ban đầu
                var options = {
                    center: { lat: 9.281294, lng: 105.721824 },
                    zoom: 16,
                    controls: true,
                };
                var map = new map4d.Map(document.getElementById("map"), options);
                // map.setPOIsEnabled(false); //Tắt địa điểm mặc định
                //Giới hạn vùng di chuyển
                map.setRestrictionBounds(new map4d.LatLngBounds([9.362071, 105.642207, 9.191152, 105.830422]));

                // Bật tắt 3D mode
                // map.enable3dMode(true)

                // Tạo đối tượng marker từ MarkerOption
                marker1 = new map4d.Marker({
                    // Form thông tin
                    title: "Trạm 1",
                    snippet: "Độ cao hiện tại: 1,5m",
                    //Tên marker
                    label: new map4d.MarkerLabel({
                        text: "Trạm 1",
                        color: "0000000",
                        fontSize: 20,
                    }),
                    position: { lat: lat_1_data, lng: lng_1_data },
                });

                let marker2 = new map4d.Marker({
                    // Form thông tin
                    title: "Trạm 2",
                    // snippet: "Độ cao hiện tại: 1,5m",
                    //Tên marker
                    label: new map4d.MarkerLabel({
                        text: "Trạm 2",
                        color: "0000000",
                        fontSize: 20,
                    }),
                    position: { lat: lat_2_data, lng: lng_2_data },
                });

                let marker3 = new map4d.Marker({
                    // Form thông tin
                    title: "Trạm 3",
                    // snippet: "Độ cao hiện tại: 1,5m",
                    //Tên marker
                    label: new map4d.MarkerLabel({
                        text: "Trạm 3",
                        color: "0000000",
                        fontSize: 20,
                    }),
                    position: { lat: lat_3_data, lng: lng_3_data },
                });

                // Thêm marker vào bản đồ
                marker1.setMap(map);
                marker2.setMap(map);
                marker3.setMap(map);

                // Form thông tin theo HTML
                // marker1.setInfoContents("có thể là string hoặc html")

                // Khởi tạo một Polygon
                // let polygon = new map4d.Polygon({
                //     fillOpacity: 0.05,
                //     userInteractionEnabled: true,
                //     paths: [
                //         [
                //             { lat: 9.283603, lng: 105.7234 },
                //             { lat: 9.283539, lng: 105.717714 },
                //             { lat: 9.278525, lng: 105.72178 },
                //             { lat: 9.283603, lng: 105.7234 },
                //         ],
                //     ],

                //     // Thêm Polygon vào bản đồ
                //     polygon.setMap(map),

                // Tính khoảng cách giữa các điểm (đơn vị: mét)
                /*let measure = new map4d.Measure([
                  [9.283603, 105.7234],
                  [9.283539, 105.717714],
                  // [9.278525, 105.721780],
                ]);
                let length = measure.length;
                console.log(length);*/

                // });
            };
        });
    });
});