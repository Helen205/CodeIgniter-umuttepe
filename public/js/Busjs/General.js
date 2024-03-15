function GeriDon() {
    history.go(-1);
}
function Blok() {
    $.blockUI({
        css: {
            border: 'none',
            padding: '15px',
            backgroundColor: '#000',
            '-webkit-border-radius': '10px',
            '-moz-border-radius': '10px',
            opacity: .5,
            color: '#fff',
            'z-index': 9999
        },
        overlayCSS: {
            'z-index': 9998
        },
        message: "<span class='fa fa-spinner fa-pulse fa-2x'></span> <br /> Lütfen Bekleyiniz..."
    });
}
function UnBlok() {
    $.unblockUI();
}
function waitfor() {
    window.location.reload();
}

function dateFormat(dateTime) {
    // 01.01.2020 12:00:00  şeklinde gelen tarih formatını date tipine dönüştürür.
    var dateSplit = dateTime.split(" ")[0];
    var timeSplit = dateTime.split(" ")[1];
    return {
        date: new Date(dateSplit.split(".")[2], parseInt(dateSplit.split(".")[1]) - 1, dateSplit.split(".")[0]),
        time: new Date(dateSplit.split(".")[2], parseInt(dateSplit.split(".")[1]) - 1, dateSplit.split(".")[0], timeSplit.split(":")[0], timeSplit.split(":")[1], timeSplit.split(":")[2])
    };
} 