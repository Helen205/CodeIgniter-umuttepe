/// <reference path="pages.js" />
$(function () {
    GetMyTickets();
    $("#btnTicketChange").click(function () {
        Blok();
        if ($("#txtPnrOrTc").val() == '' || $("#txtSoyad").val() == '') {
            ShowErrorMessage("Lütfen boş bırakılan alanları doldurunuz");
            UnBlok();
            return;
        }

        $.ajax({
            type: 'POST',
            url: '/tr/Bus/GetTickets',
            data: { pnrOrTcNo: $("#txtPnrOrTc").val(), soyad: $("#txtSoyad").val() },
            success: function (result) {
                //console.log(result);
                if (result == null) {
                    $("#Tickets").html("");
                    $('#metin').html('Bilet bulunamadı.');
                    $("#ModalMessage").modal('toggle');
                    UnBlok();
                    //ShowErrorMessage("Err");
                } else {
                    UnBlok();

                    $("#Tickets").html(result.result);

                    //ShowModalMessage(modalTitle, result);
                }
            }
        });
    });

    //üyelik varsa üyeliğe ait biletleri getirecektir

});
function TicketChange(neredenId, nereyeId, seferTarihi, changeId, cocukBiletId, allTicketChange) {
    $("#changeModal").modal('toggle');
    $(".waySelection").hide();
    GetTerminals(neredenId, nereyeId);
    setTicketVoyageDate(seferTarihi);
    $("#yolcuSayisi").val(allTicketChange ? yolcuSayisi : "1");
    $("#koltukSayisi").val(allTicketChange ? koltukSayisi : "1");
    $("#tamYolcuSayisi").val(allTicketChange ? koltukSayisi : "1");
    if (cocukBiletId)
        $("#ucretsizYolcuSayisi").val("1");
    $("#indirimliYolcuSayisi").val("0");
    $("#engelliSehitGaziYolcuSayisi").val("0");
    $("#cocukYolcuSayisi").val("0");
    $("#yediOndort").val("0");
    $("#AllTicketChange").val(allTicketChange);
    $("#ChangeId").val(changeId);

}

function btnTicketCancel() {
  
        Blok();
        $.ajax({
            type: 'POST',
            url: '/tr/Bus/BiletIptalTek',
            data: { BiletId: $("#biletId").val() },
            success: function (result) {
                //console.log(result);
                if (result == null || result!='OK') {
                    //$("#Tickets").html("");
                    //console.log(result);
                    UnBlok();
                    //ShowErrorMessage("Err");
                    $('#metin').html(result);
                    $("#ModalMessage").modal('toggle');
                } else {
                    UnBlok();
                    $('#metin').html('Bilet iptal edilmiştir.');

                    $("#ModalMessage").modal({ backdrop: 'static', keyboard: false });

                    //location.reload();
                   // $("#Tickets").html(result.result);

                    //ShowModalMessage(modalTitle, result);
                }
            }
        });

   
}


function TicketCancel(TicketDetails, gidisSaat, varisSaat, seferTarihi) {
    //if (TicketDetails.biletDetaylari.biletDurumu) {

    
    Blok();
    $('#biletId').val(TicketDetails.biletID);

    $('#gidisSaat').html('');
    $('#gidisSaat').html(gidisSaat);
    $('#varisSaat').html('');
    $('#varisSaat').html(varisSaat);
    $('#adSoyad').html('');
    $('#adSoyad').html(TicketDetails.ad + ' ' + TicketDetails.soyad);
    $('#seferGuzargah').html('');
    $('#seferGuzargah').html(TicketDetails.sefer);


    $('#seferTarih').html('');
    $('#seferTarih').html(seferTarihi);
    $('#koltukNo').html('');
    $('#koltukNo').html(TicketDetails.koltukKodu);
    $('#kategori').html('');
    $('#kategori').html(TicketDetails.kategori);


    var veriler = {
        BiletId: TicketDetails.biletID
        
    };

    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/IptalBilgisi',
        contentType: 'application/x-www-form-urlencoded',
        data: veriler,

        success: function (veriler) {
            //var items = '<option value="">' + neredenText + '</option>';          
            if (veriler != '') {
                if (veriler.iadeEdilebilirMi == false) {
                    alert('bilet(ler) iptal edilemez');
                    UnBlok();
                    $('#exampleModal').modal('hide');

                    return;
                }
                $('#iadeBedeli').html('');
                $('#iadeBedeli').html(veriler.iptalBedeli);
                $('#toplamIade').html('');
                $('#toplamIade').html(veriler.iadeTutari);

                UnBlok();
            } else {
                alert('IptalBilgisi veriler çekilemedi');
                UnBlok();
            }


        }
    });

   
        $("#exampleModal").modal('toggle');
    ///}
    //else {
       // $('#metin').html('Bilet iptali için lütfen satış ofislerine müracaat ediniz');
       // $("#ModalMessage").modal('toggle');

   // }

}


function GetTerminals(neredenId, nereyeId) {
    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/GetTerminalList',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        async: false,
        success: function (data) {
            var selectedHtml = "";
            var items = '';
            $.each(data, function (i, dt) {
                if (dt.id == neredenId) // Sayfa açıldığında Kalkış Mudanya seçili gelsin
                    selectedHtml = '<input type="hidden" value="' + dt.id + '"/><text>' + dt.name + ', ' + dt.regionName + '</text>';
                items += '<a class="dropdown-item" href="#"><input type="hidden" value="' + dt.id + '"/><text>' + dt.name + ', ' + dt.regionName + '</text></a>';
            });
            $('.fromSelect .dropdown-menu').html(items);
            FromSelectEvent(selectedHtml, nereyeId);  // Sayfa açıldığında Kalkış Mudanya seçili gelsin
        }
    });
}

function setTicketVoyageDate(seferTarihi) {
    moment.locale(lang);
    var formatDate = dateFormat(seferTarihi);
    $("#tekGunAd").text(moment(formatDate.date).format("ddd"));
    $("#tekGun").text(moment(formatDate.date).format("D"));
    $("#tekAy").text(moment(formatDate.date).format("MMMM"));
    $("#GidisTarihi").val(moment(formatDate.date).format("L"));
    $('#datetimepicker1').show();
    $('#datetimepicker2').hide();
    $('#datetimepicker').hide();
    if ($("#datetimepicker1Val"))
        $("#datetimepicker1Val").text(moment(formatDate.date).format("ddd") + ", " + moment(formatDate.date).format("D") + " " + moment(formatDate.date).format("MMMM"));
    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
    $('div[id="datetimepicker1"]').daterangepicker({
        language: lang,
        singleDatePicker: true,
        minDate: now,
        autoApply: true
        //startDate: now,
        //endDate: now,
    });

    $('div[id="datetimepicker1"]').on('apply.daterangepicker', function (ev, picker) {

        //$('#datetimepicker').hide();
        $("#tekGunAd").text(picker.startDate.format("ddd"));
        $("#tekGun").text(picker.startDate.format("D"));
        $("#tekAy").text(picker.startDate.format("MMMM"));
        //$('#datetimepicker1').show();
        $("#GidisTarihi").val(picker.startDate.format("L"));


    });

    $(document).on('apply.daterangepicker', 'div[id="datetimepicker1"]', function () {
        //$('#datetimepicker').hide();
        $("#tekGunAd").text(picker.startDate.format("ddd"));
        $("#tekGun").text(picker.startDate.format("D"));
        $("#tekAy").text(picker.startDate.format("MMMM"));
        //$('#datetimepicker1').show();
        $("#GidisTarihi").val(picker.startDate.format("L"));
    });

}

$(document).on('click', '.fromSelect .dropdown-menu a', function () {
    FromSelectEvent($(this).html());
});

function FromSelectEvent(selectedHtml, nereyeId) {
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
        url: '/' + lang + '/Bus/GetArrivalTerminalList?id=' + $('.fromSelect .dropdown-toggle input').val(),
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        async: false,
        success: function (data) {
            var selectedHtml = "";
            var items = '';
            $.each(data, function (i, dt) {
                if (dt.id == nereyeId) // Sayfa açıldığında Varış Eminönü seçili gelsin
                    selectedHtml = '<input type="hidden" value="' + dt.id + '"/><text>' + dt.name + ', ' + dt.regionName + '</text>';
                items += '<a class="dropdown-item" href="#"><input type="hidden" value="' + dt.id + '"/><text>' + dt.name + ', ' + dt.regionName + '</text></a>';
            });
            $('.toSelect .dropdown-menu').html(items);
            ToSelectEvent(selectedHtml); // Sayfa açıldığında Varış Eminönü seçili gelsin
        }
    });
}

$(document).on('click', '.toSelect .dropdown-menu a', function () {
    ToSelectEvent($(this).html());
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
    //$('.toSelect .dropdown-toggle').tooltip('disable');
}

function VoyageInfoControl() {

    $.blockUI(blockUICss);
    if (!$('.fromSelect .dropdown-toggle input').val()) {
        $.unblockUI();
        $('.fromSelect .dropdown-toggle').attr("title", "Kalkış Terminali Seçmediniz!");
        //$('.fromSelect .dropdown-toggle').tooltip().mouseover();
        return false;
    }
    if (!$('.toSelect .dropdown-toggle input').val()) {
        $.unblockUI();
        $('.toSelect .dropdown-toggle').attr("title", "Varış Terminali Seçmediniz!");
        //$('.toSelect .dropdown-toggle').tooltip().mouseover();
        return false;
    }

    if (!$('#GidisTarihi').val()) {
        $.unblockUI();
        $('#datetimepicker .dateTitleVoyageSearch').attr("title", "Tarih Seçimi Yapınız!");
        //$('#datetimepicker .dateTitleVoyageSearch').tooltip().mouseover();
        return false;
    }
    $("#frmIndex").submit();

}
function ebiletAc(id) {

    geteBiletBase64(id);
    getSeyahatBase64(id);
    //$('#ebiletModal').on('shown.bs.modal', function () {
    //    $('#ebiletModal').css('width', '100%');
    //    $('#ebiletModal').css('height', '100%');

    //    $.ajax({
    //        type: 'POST',
    //        url: '/tr/Bus/FITEBiletKontrol?id=' + id,
    //        contentType: "application/json; charset=utf-8",
    //        datatype: "json",
    //        async: false,
    //        success: function (data) {
    //            if (data == "OK") {
    //                $('#eBiletCycleDiv').cycle({
    //                    fx: 'fade' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
    //                });
    //                $('#seyahatCycleDiv').cycle({
    //                    fx: 'fade' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
    //                });
    //                var baseUrl = 'https://bus.burulas.com.tr/tr/Bus/EBiletImzaliGoruntu?id=' + id;
    //                $('#ebiletPdf').attr('src', baseUrl);
    //            }
    //            else {
    //                $('#ebiletPdf').attr('src', '');
    //            }
    //        },
    //        error: function () {
    //            $('#ebiletPdf').attr('src', '');
    //        }
    //    });

    //    $('#seyahatBilgiFormuPdf').attr('src', 'https://bus.burulas.com.tr/tr/Bus/SeyahatBilgiFormu?id=' + id);
      
    //});
    $('#ebiletModal').modal({ show: true });


    //$("#ebiletModal").toggle(function () {
    //    $('#ebiletPdf').attr("src", '/tr/Bus/EBiletImzaliGoruntu?id=' + id);
    //})

}
function rescale() {
    var size = { width: $(window).width(), height: $(window).height() }
    /*CALCULATE SIZE*/
    var offset = 20;
    var offsetBody = 150;
    $('#ebiletModal').css('height', size.height - offset);
    //$('.modal-bodyBiletGoruntu').css('height', size.height - (offset + offsetBody));
    //$('#myModal').css('top', 0);
}
$(window).bind("resize", rescale);


function GetMyTickets() {
    $.ajax({
        url: '/' + lang + '/Bus/MyTicketList',
        type: "POST",
        dataType: "json",
        cache: false,
        success: function (veriler) {
            //console.log(veriler);
            $('#biletlerim').append(veriler);

        }, error: function (jqXHR, exception) {
            UnBlok();
            //console.log(jqXHR);
            //console.log(exception);
            //alert('veriler çekilemedi');

        }

    });
}

function OnclickMyTicket(pnrortc,soyad) {
    Blok();

   
    $('#txtPnrOrTc').val(pnrortc);
    $("#txtSoyad").val(soyad);
    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/GetTickets',
        data: { pnrOrTcNo: $("#txtPnrOrTc").val(), soyad: $("#txtSoyad").val() },
        success: function (result) {
            //console.log(result);
            if (result == null) {
                $("#Tickets").html("");
                $('#metin').html('Bilet bulunamadı.');
                $("#ModalMessage").modal('toggle')
                UnBlok();
                //ShowErrorMessage("Err");
            } else {
                UnBlok();

                $("#Tickets").html(result.result);

                //ShowModalMessage(modalTitle, result);
            }
        }
    });
}

function geteBiletBase64(id)
{
    var fileRes = "";
    var url = '/tr/Bus/EBiletImzaliGoruntu?id=' + id;
    $.get(url, function (d) {
        if (d.length > 0) {
            fileRes = 'data:application/pdf;base64,' + d;
            createDownloadTag(2, fileRes);
            //$('#eBiletDownloadTag').attr('href', fileRes)
            pf("ebiletCanvas", fileRes);
        }
    });

}
function getSeyahatBase64(id) {
    var fileRes = "";
    var url = '/tr/Bus/SeyahatBilgiFormu?id=' + id;
    $.get(url, function (d) {
        if (d.length > 0) {
            fileRes = 'data:application/pdf;base64,' + d;
            createDownloadTag(1, fileRes);
            //$('#seyahatDownloadTag').attr('href', fileRes)
            pf("seyehatCanvas", fileRes);
        }
    });
}


function createDownloadTag(type, base64Data) {
    //1-seyahat , //2-ebilet
    var aTag = document.createElement('a');
    aTag.style.marginLeft = "15px";
    if (type == 1) {
        aTag.href = base64Data;
        aTag.download = "seyahatBilgiFormu.pdf";
        aTag.textContent = "Seyahat Belgesi İndir";
        document.getElementById('seyahatDownloadDiv').innerHTML = "";
        document.getElementById('seyahatDownloadDiv').appendChild(aTag);
    }
    else if (type == 2) {
        aTag.href = base64Data;
        aTag.download = "eBiletBilgiFormu.pdf";
        aTag.textContent = "E-Bilet Belgesi İndir";
        document.getElementById('eBiletDownloadDiv').innerHTML = "";
        document.getElementById('eBiletDownloadDiv').appendChild(aTag);
    }


}
