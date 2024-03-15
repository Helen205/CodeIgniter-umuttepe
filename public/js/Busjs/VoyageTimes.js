$(document).ready(function () {

    $('#calendar').datepicker($.extend($.datepicker.regional[lang],{
        //monthNames: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
        //dayNamesMin: ["Pa", "Pt", "Sl", "Ça", "Pe", "Cu", "Ct"],
        firstDay: 1,
        startDate: "now",
        inline: true,
        dateFormat: "dd.mm.yy",
        onSelect: function (dateText) {
            //console.log("Selected date: " + dateText + ", Current Selected Value= " + this.value);
            GetSeferSaatleri();
            $(this).change();
        }     
    }));

});

$(function () {
    //GetTerminalList();
    SeferRouteSeferSaatleri();
});

function SeferRouteSeferSaatleri() {
    Blok();
    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/GetSeferVoyageRoute',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {
            //var items = '<option value="">' + neredenText + '</option>';
            UnBlok();
            var items = '';
            $.each(data, function (i, dt) {                
                if (dt.neredenId == "2171db23-757e-e711-89ef-005056a08660" && dt.nereyeId == "620d2c59-757e-e711-89ef-005056a08660") {
                    items += "<option selected value='" + dt.id + "' data-neredenId='" + dt.neredenId + "' data-nereyeId='" + dt.nereyeId + "'>" + dt.neredenName + ' - ' + dt.nereyeName + "</option>";
                }
                else {
                    items += "<option value='" + dt.id + "' data-neredenId='" + dt.neredenId + "' data-nereyeId='" + dt.nereyeId + "'>" + dt.neredenName + ' - ' + dt.nereyeName + "</option>";
                }
            });
    
            $('#routes').html(items);

            GetSeferSaatleri();

        }
    });
    UnBlok();
}

function GetTerminalList() {
    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/GetTerminalList',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {
            //var items = '<option value="">' + neredenText + '</option>';
            var items = '';
            $.each(data, function (i, dt) {
                items += "<option value='" + dt.id + "' data-region='" + dt.regionName + "'>" + dt.name + "</option>";
            });
            //items += "<option value='77c36df0-b308-e211-9b8d-a526e1ea2306'>Bursa (Uludağ)</option>";
            $('#nereden').html(items);
            var regionnamenereden = $('#nereden option:selected').attr('data-region');
            //console.log(regionnamenereden);
            $('#neredenTitle').html(regionnamenereden);
            GetArrivalTerminalList(data[0].id);
            //$('#nereden').css('background', '');

        }
    });
}

function GetArrivalTerminalList(id) {
    //alert(id);
    //console.log(id);
    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/GetArrivalTerminalList?id=' + id,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {
            //var items = '<option value="">' + neredenText + '</option>';
            var items = '';
            $.each(data, function (i, dt) {
                items += "<option value='" + dt.id + "' data-region='" + dt.regionName + "'>" + dt.name + "</option>";
            });
            //items += "<option value='77c36df0-b308-e211-9b8d-a526e1ea2306'>Bursa (Uludağ)</option>";
            $('#nereye').html(items);
            var regionnamenereden = $('#nereden option:selected').attr('data-region');
            var regionnamenereye = $('#nereye option:selected').attr('data-region');
            //console.log(regionnamenereden);
            //console.log(regionnamenereye);

            $('#neredenTitle').html(regionnamenereden);
            $('#nereyeTitle').html(regionnamenereye);
            GetSeferSaatleri();

            //$('#nereden').css('background', '');
        }
    });
}
function GetBiletFiyatlari() {
    GetSeferSaatleri();
}

function GetSeferSaatleri() {
    Blok();
    var neredenId = $('#routes option:selected').attr('data-neredenId');
    var nereyeId = $('#routes option:selected').attr('data-nereyeId');
    //debugger;
    //console.log(neredenId);
    //console.log(nereyeId);
    if (neredenId != "" && nereyeId!="") {

   

    var veriler = {
        Nereden: neredenId,
        Nereye: nereyeId
      
    };
    
    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/GetSeferSaatleri',
        contentType: 'application/x-www-form-urlencoded',
        data: veriler,
       
        success: function (veriler) {
            //var items = '<option value="">' + neredenText + '</option>';
            if (veriler != '') {
                var tarih = $('#calendar').val();
                $('#seferSaatleri').html('');
                var htmlText = '';
                for (var i = 0; i < veriler.length; i++) {
                    if (veriler[i].voyageDate.split(' - ')[0] == $('#calendar').val()) {
                       
                        for (var j = 0; j < veriler[i].voyageTimes.length; j++) {
                            htmlText += '<div class="col-3 fromToVoyageTimes px-0 mr-2 text-center">';
                            htmlText += ' <span class="SemiBold">' + veriler[i].voyageTimes[j] + '</span></div >';
                        }
                        $('#seferSaatleri').html(htmlText);
                        break;
                    }
                }
                UnBlok();
            } else {
                alert('GetSeferSaatleri veriler çekilemedi');
                UnBlok();
            }


        }
    });

    } 

}

