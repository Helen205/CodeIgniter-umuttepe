$(document).ready(function () {
    var map = L.map('map').setView([40.687151, 28.302940], 9);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                attribution: '&copy; <a href="http://www.serim.com.tr">Serim Yazılım</a>',
                subdomains: ['a', 'b', 'c'],
                tileSize: 512,
                zoomOffset: -1
            })
            .addTo(map);
    $.ajax({
        type: "POST",
        url: '/' + lang + '/Bus/GetTerminals/',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (msg) {
            for (var i = 0; i < msg.length; i++) {
                var marker = L.marker([msg[i].enlem, msg[i].boylam]).addTo(map);
                marker.bindPopup(msg[i].name).openPopup();
            }
        }
    });
});