
$(document).ready(function () {

    var currentDate = new Date();
    var startDate = new Date();
    startDate.setDate(currentDate.getDate() - 1);

    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    moment.locale(lang);
    $("#tekGunAd").text(moment().format("ddd"));
    $("#tekGun").text(moment().format("D"));
    $("#tekAy").text(moment().format("MMMM"));
    $("#GidisTarihi").val(moment().format("L"));
    $('#datetimepicker1').show();
    $('#datetimepicker2').hide();
    $('#datetimepicker').hide();
    
    function dateTimePickerOptions() {
        return {
            language: lang,
            singleDatePicker: true,
            minDate: now,
            autoApply: true,
            startDate: now,
            //endDate: now,
        };
    }
    
    $('div[id="datetimepicker1"]').daterangepicker(dateTimePickerOptions());
       
    $('div[id="datetimepicker1"]').on('apply.daterangepicker', function (ev, picker) {

        //$('#datetimepicker').hide();
        $("#tekGunAd").text(picker.startDate.format("ddd"));
        $("#tekGun").text(picker.startDate.format("D"));
        $("#tekAy").text(picker.startDate.format("MMMM"));
        //$('#datetimepicker1').show();
        $("#GidisTarihi").val(picker.startDate.format("L"));
        
        
    });

  

    
    $('input[type=radio][name=radio]').change(function () {
        $('#datetimepicker').hide();
        $("#tekGunAd").text(moment().format("ddd"));
        $("#tekGun").text(moment().format("D"));
        $("#tekAy").text(moment().format("MMMM"));
      

        $('#datetimepicker1').show();
        $("#GidisTarihi").val(moment().format("L"));
    
        $("#gitGunAd").text(moment().format("ddd"));
        $("#gitGun").text(moment().format("D"));
        $("#gitAy").text(moment().format("MMMM"));
        $("#gelGunAd").text(moment().format("ddd"));
        $("#gelGun").text(moment().format("D"));
        $("#gelAy").text(moment().format("MMMM"));
        $('#datetimepicker2').show();
        $("#GidisTarihi").val(moment().format("L"));
        $("#DonusTarihi").val(moment().format("L"));

        if (this.value == 0) {
            $('#radio1fa').addClass('fa-circle');
            $('#radio1fa').removeClass('fa-circle-o');
            $('#radio1fa').css('color', '#ffa507');

            $('#radio2fa').addClass('fa-circle-o');
            $('#radio2fa').removeClass('fa-circle');
            $('#radio2fa').css('color', '#A7ADBF');

            $('#datetimepicker').hide();
            $('#datetimepicker1').show();
            $('#datetimepicker2').hide();
            $('div[id="datetimepicker1"]').daterangepicker({
                language: lang,
                singleDatePicker: true,
                minDate: now,
                autoApply: true,
                //startDate: now,
                //endDate: now,
            });
            $("#DonusTarihi").val('');

        }
        else if (this.value == 1) {

            $('#radio2fa').addClass('fa-circle');
            $('#radio2fa').removeClass('fa-circle-o');
            $('#radio2fa').css('color','#ffa507');
           
            $('#radio1fa').addClass('fa-circle-o');
            $('#radio1fa').removeClass('fa-circle');
            $('#radio1fa').css('color','#A7ADBF');

            $('#datetimepicker').hide();
            $('#datetimepicker1').hide();
            $('#datetimepicker2').show();
            $('div[id="datetimepicker21"]').daterangepicker(dateTimePickerOptions());

            $('div[id="datetimepicker22"]').daterangepicker(dateTimePickerOptions());
        }

        $('div[id="datetimepicker1"]').on('apply.daterangepicker', function (ev, picker) {

            $('#datetimepicker').hide();
            $("#tekGunAd").text(picker.startDate.format("ddd"));
            $("#tekGun").text(picker.startDate.format("D"));
            $("#tekAy").text(picker.startDate.format("MMMM"));
            $('#datetimepicker1').show();
            $("#GidisTarihi").val(picker.startDate.format("L"));
        });
        $('div[id="datetimepicker21"]').on('apply.daterangepicker', function (ev, picker) {
            $("#gitGunAd").text(picker.startDate.format("ddd"));
            $("#gitGun").text(picker.startDate.format("D"));
            $("#gitAy").text(picker.startDate.format("MMMM"));
            $("#GidisTarihi").val(picker.startDate.format("L"));

            $('div[id="datetimepicker22"]').data('daterangepicker').minDate = picker.startDate;

            $("#gelGunAd").text(picker.startDate.format("ddd"));
            $("#gelGun").text(picker.startDate.format("D"));
            $("#gelAy").text(picker.startDate.format("MMMM"));
            $("#DonusTarihi").val(picker.startDate.format("L"));
        });
        $('div[id="datetimepicker22"]').on('apply.daterangepicker', function (ev, picker) {
                $("#gelGunAd").text(picker.startDate.format("ddd"));
                $("#gelGun").text(picker.startDate.format("D"));
                $("#gelAy").text(picker.startDate.format("MMMM"));
                $("#DonusTarihi").val(picker.startDate.format("L"));
        });
    });





});

function mobileChangeWay(val) {
        var currentDate = new Date();
        var startDate = new Date();
        startDate.setDate(currentDate.getDate() - 1);

        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        moment.locale('tr');
        $('#datetimepicker').hide();
        $("#datetimepicker1Val").text(moment().format("ddd") + ", " + moment().format("D") + " " + moment().format("MMMM"));
        $('#datetimepicker1').show();
        $("#GidisTarihi").val(moment().format("L"));

        $("#gitGunAd").text(moment().format("ddd"));
        $("#gitGun").text(moment().format("D"));
        $("#gitAy").text(moment().format("MMMM"));
        $("#gelGunAd").text(moment().format("ddd"));
        $("#gelGun").text(moment().format("D"));
        $("#gelAy").text(moment().format("MMMM"));
        $('#datetimepicker2').show();
        $("#GidisTarihi").val(moment().format("L"));
        $("#DonusTarihi").val(moment().format("L"));

        if (val == 0) {
            $('#radio1fa').addClass('fa-circle');
            $('#radio1fa').removeClass('fa-circle-o');
            $('#radio1fa').css('color', '#ffa507');

            $('#radio2fa').addClass('fa-circle-o');
            $('#radio2fa').removeClass('fa-circle');
            $('#radio2fa').css('color', '#A7ADBF');

            $('#datetimepicker').hide();
            $('#datetimepicker1').show();
            $('#datetimepicker2').hide();
            $('div[id="datetimepicker1"]').daterangepicker({
                language: lang,
                singleDatePicker: true,
                minDate: now,
                autoApply: true,
                //startDate: now,
                //endDate: now,
            });

        }
        else if (val == 1) {

            $('#radio2fa').addClass('fa-circle');
            $('#radio2fa').removeClass('fa-circle-o');
            $('#radio2fa').css('color', '#ffa507');

            $('#radio1fa').addClass('fa-circle-o');
            $('#radio1fa').removeClass('fa-circle');
            $('#radio1fa').css('color', '#A7ADBF');

            $('#datetimepicker').hide();
            $('#datetimepicker1').hide();
            $('#datetimepicker2').show();
            $('div[id="datetimepicker2"]').daterangepicker({
                language: lang,
                //singleDatePicker: true,
                minDate: now,
                autoApply: true,
                //startDate: now,
                //endDate: now,
            });
        }

        $('div[id="datetimepicker1"]').on('apply.daterangepicker', function (ev, picker) {

            $('#datetimepicker').hide();
            $("#tekGunAd").text(picker.startDate.format("ddd"));
            $("#tekGun").text(picker.startDate.format("D"));
            $("#tekAy").text(picker.startDate.format("MMMM"));
            $('#datetimepicker1').show();
            $("#GidisTarihi").val(picker.startDate.format("L"));
        });
        $('div[id="datetimepicker2"]').on('apply.daterangepicker', function (ev, picker) {
            $('#datetimepicker').hide();
            $("#gitGunAd").text(picker.startDate.format("ddd"));
            $("#gitGun").text(picker.startDate.format("D"));
            $("#gitAy").text(picker.startDate.format("MMMM"));
            $("#gelGunAd").text(picker.endDate.format("ddd"));
            $("#gelGun").text(picker.endDate.format("D"));
            $("#gelAy").text(picker.endDate.format("MMMM"));
            $('#datetimepicker2').show();
            $("#GidisTarihi").val(picker.startDate.format("L"));
            $("#DonusTarihi").val(picker.endDate.format("L"));
        });
}



//"locale": {
//                    "format": "DD/MM/YYYY",
//                    "separator": " - ",
//                    "applyLabel": "Se&#231;",
//                    "cancelLabel": "&#304;ptal",
//                    "fromLabel": "Gidiş",
//                    "toLabel": "Dön&#252;ş",
//                    "customRangeLabel": "Custom",
//                    "weekLabel": "H",
//                    "daysOfWeek": [
//                        "Paz",
//                        "Pzt",
//                        "Sal",
//                        "&#199;ar",
//                        "Per",
//                        "Cum",
//                        "Cmt"
//                    ],
//                    "monthNames": [
//                        "Ocak",
//                        "&#350;ubat",
//                        "Mart",
//                        "Nisan",
//                        "May&#305;s",
//                        "Haziran",
//                        "Temmuz",
//                        "A&#287;ustos",
//                        "Eyl&#252;l",
//                        "Ekim",
//                        "Kas&#305;m",
//                        "Aral&#305;k"
//                    ],
//                    "firstDay": 1
//                },