var slideTime = 7000, slideTimeCamp = 6000, slidePrice = 0, slidePriceCamp = 0, activePage = 1, activePageCamp = 1, timer, timerCamp, typeSlideEffect;
var NeredenText = "";
var NeredenRegion = "";
var NereyeText = "";
var NereyeRegion = "";
var neredenId = "";
var nereyeId = "";

$(function () {

    //$.blockUI(blockUICss);
    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/GetFromListForWhereMyBus',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        async: false,
        success: function (data) {
            var selectedHtml = "";
            var items = '';

            $.each(data, function (i, dt) {
                items += '<a class="dropdown-item" href="#"><input type="hidden" value="' + dt.srm_nereden + '"/><text>' + dt.srm_neredenName +'</text></a>';
            });
            $('.fromSelect .dropdown-menu').html(items);
        }
    });

    $(document).on('click', '.fromSelect .dropdown-menu a', function () {

        FromSelectEvent($(this).html(), NeredenText, NeredenRegion);

        //bursa terminal ise plaka gözükecek.
        neredenId = $('.fromSelect .dropdown-toggle input').attr("name", "Nereden").val();
        nereyeId = $('.toSelect .dropdown-toggle input').attr("name", "Nereye").val();
        if (neredenId == "2171db23-757e-e711-89ef-005056a08660" || neredenId == "da90f6c4-557b-e711-8ea2-000c29f304a8") {
            $("#divPlaka").show(50);
        }
        else {
            $("#divPlaka").hide(500);
        }
    });

    function FromSelectEvent(selectedHtml) {


        $('.fromSelect .dropdown-toggle').html(selectedHtml);
        $('.fromSelect .dropdown-toggle input').attr("name", "Nereden");
        var NeredenText = $('.fromSelect .dropdown-toggle text').html().split(',')[0];
        var NeredenRegion = $.trim($('.fromSelect .dropdown-toggle text').html().split(',')[1]);
        $('#NeredenText').val(NeredenText);
        $('#NeredenRegion').val(NeredenRegion);
        $('.fromSelect .dropdown-toggle text').html(NeredenText);
        $('.fromSelect .Region').html(NeredenRegion);
        //$('.fromSelect .dropdown-toggle').tooltip('disable');
        $.ajax({
            type: 'POST',
            url: '/' + lang + '/Bus/GetToListForWhereMyBus?neredenId=' + $('.fromSelect .dropdown-toggle input').val(),
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            async: false,
            success: function (data) {
                //$.unblockUI();
                var selectedHtml = "";
                var items = '';
                document.getElementById('dropdownMenuButtonTo').removeAttribute('disabled');
                $.each(data, function (i, dt) {
                    //if (dt.id == "620d2c59-757e-e711-89ef-005056a08660" || dt.id =="06cd67e3-557b-e711-8ea2-000c29f304a8") // Sayfa açıldığında Varış Eminönü seçili gelsin // eb9a2e6c-dda7-e611-8a56-000c29f304a8 //cbd18ce0-f8b2-e611-b630-000c29f304a8 
                    //{
                    //    selectedHtml = '<input type="hidden" value="' + dt.id + '"/><text>' + dt.name + ', ' + dt.regionName + '</text>';
                    //    NereyeText = dt.name;
                    //    NereyeRegion = dt.regionName;
                    //}

                    items += '<a class="dropdown-item" href="#"><input type="hidden" value="' + dt.srm_nereye + '"/><text>' + dt.srm_nereyeName + '</text></a>';
                });
                $('.toSelect .dropdown-menu').html(items);
                //açılan liste ilk eleman  otomatik doldurur.
                //Bazen js kaçırdığı oluyor garantiya almak için bekletiyorum 500 milisaniye kadar
                setTimeout(function () {
                    toFirstSelectedItem();
                }, 200)
                if (!selectedHtml) return;
                /*ToSelectEvent(selectedHtml, NereyeText, NereyeRegion);*/ // Sayfa açıldığında Varış Eminönü seçili gelsin
            }
        });


    }

    $(document).on('click', '.toSelect .dropdown-menu a', function () {

        ToSelectEvent($(this).html(), NereyeText, NereyeRegion);
    });

    function ToSelectEvent(selectedHtml) {
        $('.toSelect .dropdown-toggle').html(selectedHtml);
        $('.toSelect .dropdown-toggle input').attr("name", "Nereye");
        var NereyeText = $('.toSelect .dropdown-toggle text').html().split(',')[0];
        var NereyeRegion = $.trim($('.toSelect .dropdown-toggle text').html().split(',')[1]);
        $('.toSelect .dropdown-toggle text').html(NereyeText);
        $('.toSelect .Region').html(NereyeRegion);
        $('#NereyeText').val(NereyeText);
        $('#NereyeRegion').val(NereyeRegion);
    }



    $("#CampaignItem").hover(
        function () {
            clearInterval(timerCamp);
        }, function () {
            timerCamp = setInterval(function () {
                CampSlide("next", activePage);
                activePageCamp++;
            }, slideTimeCamp);
        }
    );

    $("#AnnouncementItem").hover(
        function () {
            clearInterval(timer);
        }, function () {
            timer = setInterval(function () {
                AnnouncementSlide("next", activePage);
                activePage++;
            }, slideTime);
        }
    );

    $(document).ready(function () {
        $("#divPlaka").hide();
        document.getElementsByClassName('dropdown-item')[4].click();
        setTimeout(() => document.getElementsByClassName('dropdown-item')[8].click(), 500);
        setTimeout(() => document.getElementsByClassName('searchButton')[0].click(), 1000);
    });
    //function GetDuyurular() {
    //    $.ajax({
    //        type: 'POST',
    //        url: '/' + lang + '/Bus/GetDuyurular',
    //        contentType: "application/json; charset=utf-8",
    //        datatype: "json",
    //        async: false,
    //        success: function (data) {
    //            var items = '';
    //            //console.log(data);
    //            if (!data) {
    //                GetDuyurular();
    //                return;
    //            }

    //            if (data.length === 0) {
    //                $("#AnnouncementItem").html('<div class="boxHome text-center" style="width: 22rem;"><div class="AnnouncementCenter"><i style="font-size:50px;" class= "fa fa-exclamation-triangle"></i><div class="AnnouncementText mt-3">Bulunamadı</div></div></div>');
    //            } else {
    //                $("#AnnouncementItem").html(null);
    //                slidePrice = data.length;
    //                //alert(slidePrice)
    //                $("#announcementNumber").html(announcementAndNewsText + " (" + slidePrice + ")");
    //                $.each(data, function (i, dt) {
    //                    dt.index = i + 1;
    //                    GetHtmlAnnouncementItem(dt);
    //                });
    //                if (slidePrice == 1) {
    //                    $(".announcementsBtn").css('display', 'none');
    //                }
    //                timer = setInterval(function () {
    //                    if (slidePrice == 1) {
    //                        $(".announcementsBtn").css('display', 'none');
    //                    } else {
    //                        AnnouncementSlide("next", activePage);
    //                        activePage++;
    //                    }

    //                }, slideTime);
    //            }
    //        }
    //    });
    //}
    //function GetCamp() {
    //    $.ajax({
    //        type: 'POST',
    //        url: '/' + lang + '/Bus/GetCampaign',
    //        contentType: "application/json; charset=utf-8",
    //        datatype: "json",
    //        data: { 'lang': lang === "tr" ? 0 : 1 },
    //        async: false,
    //        success: function (data) {
    //            var items = '';
    //            //console.log(data);
    //            if (!data) {
    //                GetCamp();
    //                return;
    //            }

    //            if (data.length === 0) {
    //                $("#CampaignItem").html('<div class="boxHome text-center" style="width: 22rem;"><img src="/img/campaign.png" style="width:100%;height: 320px;"></div>');

    //            } else {
    //                $("#CampaignItem").html(null);
    //                slidePriceCamp = data.length;
    //                $("#campNumber").html(campaignsText + " (" + slidePriceCamp + ")");
    //                $.each(data, function (i, dt) {
    //                    dt.index = i + 1;
    //                    GetHtmlCampItem(dt);
    //                });
    //                if (slidePriceCamp === 1) {
    //                    $(".CampSlideBtn").css('display', 'none');
    //                }
    //                timerCamp = setInterval(function () {
    //                    if (slidePriceCamp === 1) {
    //                        $(".CampSlideBtn").css('display', 'none');
    //                    } else {
    //                        CampSlide("next", activePageCamp);
    //                        activePageCamp++;
    //                    }

    //                }, slideTimeCamp);
    //            }



    //        }
    //    });
    //}






});


function toFirstSelectedItem() {
    var el = document.querySelectorAll('#dropdownMenuButtonToItems .dropdown-item');
    if (!el) return;

    var firstEl = el[0];
    if (!firstEl) return;

    var TargetText = el[0].children[1].innerText.split(',')[0];
    var TargetRegionText = el[0].children[1].innerText.split(',')[1];
    var TargetId = el[0].children[0].value;

    var firstElHtml = '<input type="hidden" value="' + TargetId + '"/><text>' + TargetText + ', ' + TargetRegionText + '</text>';
    if (!firstElHtml) return;

    $('.toSelect .dropdown-toggle').html(firstElHtml);
    $('.toSelect .dropdown-toggle input').attr("name", "Nereye");
    $('.toSelect .dropdown-toggle text').html(TargetText);
    $('.toSelect .Region').html(TargetRegionText);
    $('#NereyeText').val(TargetText);
    $('#NereyeRegion').val(TargetRegionText);
};

//function GetHtmlAnnouncementItem(model) {
//    $.ajax({
//        type: 'POST',
//        url: '/' + lang + '/Bus/GetDuyuruHtml',
//        data: { duyuru: model },
//        contentType: 'application/x-www-form-urlencoded',
//        datatype: "json",
//        //async:false,
//        success: function (data) {
//            $("#AnnouncementItem").append(data);
//        }
//    });
//}
//function GetHtmlCampItem(model) {
//    $.ajax({
//        type: 'POST',
//        url: '/' + lang + '/Bus/GetKampanyaHtml',
//        data: { duyuru: model },
//        contentType: 'application/x-www-form-urlencoded',
//        datatype: "json",
//        //async: false,
//        success: function (data) {
//            $("#CampaignItem").append(data);
//        }
//    });
//}
//function CampSlide(val, index) {

//    var zoomOut = typeSlideEffect === 0 ? "animate__fadeOutRight" : "animate__backOutLeft";
//    var zoomIn = typeSlideEffect === 0 ? "animate__fadeInUp" : "animate__backInLeft";

//    if (index === slidePriceCamp) {
//        //console.log(index, slidePriceCamp);
//        $("#camp_" + slidePriceCamp).addClass(zoomOut);
//        $("#camp_" + slidePriceCamp).removeClass(zoomIn);
//        setTimeout(function () { $("#camp_" + slidePriceCamp).addClass("d-none"); }, 700);

//        activePageCamp = 0;
//        CampSlide("next", activePageCamp);
//        // activePageCamp++;
//    } else {
//        if (index > 0) {
//            if (val === "next") {
//                $("#camp_" + index).addClass(zoomOut);
//                $("#camp_" + index).removeClass(zoomIn);
//                var i = index;
//                setTimeout(function () { $("#camp_" + i).addClass("d-none"); }, 700);
//                activePageCamp = index;
//                index = index + 1;
//                $("#camp_" + index).removeClass("d-none");
//                $("#camp_" + index).removeClass(zoomOut);
//                $("#camp_" + index).addClass(zoomIn);
//            } else {
//                if (index != 0) {
//                    $("#camp_" + index).addClass(zoomOut);
//                    $("#camp_" + index).removeClass(zoomIn);
//                    var i = index;
//                    setTimeout(function () { $("#camp_" + i).addClass("d-none"); }, 700);
//                    activePageCamp = index - 1;
//                    index = index - 1;
//                    //console.log("#camp_" + index);
//                    $("#camp_" + index).removeClass("d-none");
//                    $("#camp_" + index).removeClass(zoomOut);
//                    $("#camp_" + index).addClass(zoomIn);
//                }
//            }
//        } else {
//            if (index === 0) {
//                if (val === "next") {
//                    $("#camp_" + index).addClass(zoomOut);
//                    $("#camp_" + index).removeClass(zoomIn);
//                    var i = index;
//                    setTimeout(function () { $("#camp_" + i).addClass("d-none"); }, 700);
//                    activePageCamp = index;
//                    index = index + 1;
//                    $("#camp_" + index).removeClass("d-none");
//                    $("#camp_" + index).removeClass(zoomOut);
//                    $("#camp_" + index).addClass(zoomIn);

//                }
//            }
//        }
//    }
//}

//function AnnouncementSlide(val, index) {
//    var zoomOut = typeSlideEffect === 0 ? "animate__fadeOutLeft" : "animate__backOutLeft";
//    var zoomIn = typeSlideEffect === 0 ? "animate__fadeInUp" : "animate__backInLeft";

//    if (index === slidePrice) {
//        $("#announcement_" + slidePrice).addClass(zoomOut);
//        $("#announcement_" + slidePrice).removeClass(zoomIn);
//        setTimeout(function () { $("#announcement_" + slidePrice).addClass("d-none"); }, 700);

//        activePage = 0;
//        AnnouncementSlide("next", activePage);
//        // activePage++;
//    } else {
//        if (index > 0) {
//            if (val === "next") {
//                $("#announcement_" + index).addClass(zoomOut);
//                $("#announcement_" + index).removeClass(zoomIn);
//                var i = index;
//                setTimeout(function () { $("#announcement_" + i).addClass("d-none"); }, 700);
//                activePage = index;
//                index = index + 1;
//                $("#announcement_" + index).removeClass("d-none");
//                $("#announcement_" + index).removeClass(zoomOut);
//                $("#announcement_" + index).addClass(zoomIn);
//            } else {
//                if (index != 0) {
//                    $("#announcement_" + index).addClass(zoomOut);
//                    $("#announcement_" + index).removeClass(zoomIn);
//                    var i = index;
//                    setTimeout(function () { $("#announcement_" + i).addClass("d-none"); }, 700);
//                    activePage = index - 1;
//                    index = index - 1;
//                    //console.log("#announcement_" + index);
//                    $("#announcement_" + index).removeClass("d-none");
//                    $("#announcement_" + index).removeClass(zoomOut);
//                    $("#announcement_" + index).addClass(zoomIn);
//                }
//            }
//        } else {
//            if (index === 0) {
//                if (val === "next") {
//                    $("#announcement_" + index).addClass(zoomOut);
//                    $("#announcement_" + index).removeClass(zoomIn);
//                    var i = index;
//                    setTimeout(function () { $("#announcement_" + i).addClass("d-none"); }, 700);
//                    activePage = index;
//                    index = index + 1;
//                    $("#announcement_" + index).removeClass("d-none");
//                    $("#announcement_" + index).removeClass(zoomOut);
//                    $("#announcement_" + index).addClass(zoomIn);

//                }
//            }
//        }
//    }
//}

function GetVoyageTime() {

    $.ajax({
        async: true,
        type: 'POST',
        url: '/' + lang + '/Bus/WhereMyBusPartialVm',
        data: {
            neredenId: $('.fromSelect .dropdown-toggle input').val(),
            nereyeId: $('.toSelect .dropdown-toggle input').val(),

        },
        datatype: "json",
        success: function (data) {
            $('#voyagetimehtml').html("");
            if (data != '') {

                var height = $(window).height();//ekran boyutu

                $('.homePaper').css('height', height+50);

                $('#voyagetimehtml').html(data);

            } else {
                ShowErrorMessage("Veri bulunamadı");
            }
        },
        error: function (error) {
            UnBlok();
            ShowErrorMessage("Hata oluştu ! Tekrar deneyiniz.");
            console.log(error)
        }
    });
}