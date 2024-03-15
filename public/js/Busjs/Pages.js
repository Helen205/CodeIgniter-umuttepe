$(function() {
    //GetTerminalList();
    GetSeferRouteFiyat();
});

function GetSeferRouteFiyat() {
    Blok()
    $.ajax({
        type: 'POST',
        url: '/' + lang + '/Bus/GetSeferRoute',
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {
            //var items = '<option value="">' + neredenText + '</option>';
            //console.log(data);
            //debugger;
            UnBlok();
            var items = '';
            $.each(data, function (i, dt) {
                items += "<option value='" + dt.priceLevelId + "' data-neredenId='" + dt.neredenId + "'  data-nereyeId='" + dt.nereyeId + "'>" + dt.neredenName +' - ' + dt.nereyeName + "</option>";
            });
            //items += "<option value='77c36df0-b308-e211-9b8d-a526e1ea2306'>Bursa (Uludağ)</option>";
            $('#routes').html(items);
            var secilipricelistId = $('#routes option:selected').val();
            GetBiletFiyatlari(secilipricelistId);

        }
    });
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
                items += "<option value='" + dt.id + "' data-region='" + dt.regionName+"'>" + dt.name + "</option>";
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
        url: '/' + lang + '/Bus/GetArrivalTerminalList?id='+id,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        success: function (data) {
            //var items = '<option value="">' + neredenText + '</option>';
            var items = '';
            $.each(data, function (i, dt) {
                items += "<option value='" + dt.id + "' data-region='" + dt.regionName +"'>" + dt.name + "</option>";
            });
            //items += "<option value='77c36df0-b308-e211-9b8d-a526e1ea2306'>Bursa (Uludağ)</option>";
            $('#nereye').html(items);
            var regionnamenereden = $('#nereden option:selected').attr('data-region');
            var regionnamenereye = $('#nereye option:selected').attr('data-region');
            //console.log(regionnamenereden);
            //console.log(regionnamenereye);

            $('#neredenTitle').html(regionnamenereden);
            $('#nereyeTitle').html(regionnamenereye);
            GetBiletFiyatlari();

            //$('#nereden').css('background', '');
        }
    });
}


function GetBiletFiyatlari(priceLevelId) {
    Blok();


           
      
                $.ajax({
                    type: 'POST',
                    url: '/' + lang +  '/Bus/GetSeferFiyatlari?priceLevelId=' + priceLevelId,
                    contentType: "application/json; charset=utf-8",
                    datatype: "json",
                    success: function (veriler) {
                        //var items = '<option value="">' + neredenText + '</option>';
                        if (veriler != '') {
                            $('#seferfiyatlari').html(veriler);
                            UnBlok();
                        } else {
                            alert('GetSeferFiyatlari veriler çekilemedi');
                            UnBlok();
                        }
                        

                    }
                });

        
        
 
}