$(function () {
    //$.validator.messages.email = "*";
    //$(document).on('submit', '#frmRegister', function () {
    //    Register();
    //    return false;
    //});

    $('#birthdate').mask('99/99/9999')
});


function validateEmail(email) {
    var re = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
    return re.test(email);
}

function validatePassword(pass) {
    //var re = /(?=.*\W)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[0-9a-zA-Z\W]{8,}$/;  8 karakter sayı büyük harf küçük harf ve özel karakter zorunlu
    var re = /(?=.*[A-Za-z])(?=.*[0-9])[0-9a-zA-Z\W]{6,}$/; // 6 karakter sayı ve harf zorunlu
    return re.test(pass);
}

function validateTC(tc) {
    var re = /[0-9]{11}/;
    return re.test(tc);
}
$("#uyruk").change(function () {
    if ($(this).val() == 1) {
        $('#tcidentity').val("");
        $('#tcidentity').attr("disabled", "disabled");
        document.getElementById('divExtra').style.display = "flex";
    } else {
        $('#tcidentity').val("");
        $('#tcidentity').removeAttr("disabled");
        document.getElementById('divExtra').style.display = "none";
    }
});
function RegisterControl() {
    var err = false;
    var errMsg = "";
    if (!$('#exampleCheck1').is(":checked")) {
        err = true;
        errMsg = "Kayıt olmak için Taşıma Kuralları'nı kabul etmelisiniz.";
    }

    if (!$('#exampleCheck2').is(":checked")) {
        err = true;
        errMsg = "Kayıt olmak için KVKK Kuralları'nı kabul etmelisiniz.";
    }

    if ($("#adi").val() == "") {
        err = true;
        errMsg = "Lütfen adınızı doldurunuz.";
    }

    if ($("#soyadi").val() == "") {
        err = true;
        errMsg = "Lütfen soyadınızı doldurunuz.";
    }
    if ($("#uyruk").val() == "1") {
        if ($("#cinsiyet").val() == "") {
            err = true;
            errMsg = "Lütfen tüm alanları doldurunuz.";
        }

        if ($("#birthdate").val() == "") {
            err = true;
            errMsg = "Lütfen tüm alanları doldurunuz.";
        }
    }
    if ($("#telefon").val() == "") {
        err = true;
        errMsg = "Lütfen telefon numaranızı doldurunuz.";
    }

    if ($("#email").val() == "") {
        err = true;
        errMsg = "Lütfen email alanını doldurunuz.";
    }

    if ($("#birthdate").val() == "" || $("#birthdate").val().length != 10) {

        err = true;
        errMsg = "Lütfen doğum tarihi alanını doldurunuz.";
    }

    if ($("#passwordregister").val() == "") {
        err = true;
        errMsg = "Lütfen şifre alanını doldurunuz.";
    }

    if ($("#newpassword").val() == "") {
        err = true;
        errMsg = "Lütfen şifre tekrar alanının doldurunuz.";
    }

    if (validateEmail($("#email").val()) == false) {
        err = true;
        errMsg = "Lütfen geçerli bir mail giriniz.";
    }

    if (validatePassword($("#passwordregister").val()) == false) {
        err = true;
        errMsg = "Lütfen geçerli bir parola giriniz.";
    }

    if (validatePassword($("#newpassword").val()) == false) {
        err = true;
        errMsg = "Lütfen geçerli bir parola giriniz.";
    }

    if (!err) {
        return true;
    } else {
        //$.unblockUI();
        ShowErrorMessage(errMsg);
        //$('#btnRegister').removeAttr("disabled");
        return false;
    }
}

$("#tcidentity").blur(function () {
    if ($("#uyruk").val() == 0) {
        if (CheckTcNo($(this).val())) {
            $.ajax({
                async: false,
                type: 'POST',
                url: '/tr/Bus/TcSorgu',
                data: { tcIdentity: $("#tcidentity").val(), ad: $("#adi").val(), soyad: $("#soyadi").val(), index: "0", sessiondata: "", ticketCategory: "", sefer: "", BirthDay: $('#birthdate').val()},
                success: function (result) {
                    if (result != null && result.isSuccess) {
                        $("#adi").val(result.data.name);
                        $("#soyadi").val(result.data.lastName);
                        $("#birthdate").val(result.data.birthDay.replace('.', '/').replace('.', '/').replace('00:00:00',''));
                        $("#cinsiyet").val(result.data.gender);
                    } else {
                        ShowErrorMessage(result.statusMessage);
                        $("#adi").val("");
                        $("#soyadi").val("");
                        $("#birthdate").val("");
                        $("#cinsiyet").val("");
                        $("#tcidentity").val("");
                    }
                }
            });
        } else {
            //ShowErrorMessage(tcError);
            $(this).val("");
        }
    }
});

function CheckTcNo(a) {
    if (a.substr(0, 1) == 0 && a.lenght != 11) {
        return false;
    }
    var i = 9, md = '', mc = '', digit, mr = '';
    while (digit = a.charAt(--i)) {
        i % 2 == 0 ? md += digit : mc += digit;
    }
    var mod = parseInt(((eval(md.split('').join('+')) * 7) - eval(mc.split('').join('+'))) % 10);
    if (mod < 0)
        mod += 10;
    if (mod != parseInt(a.substr(9, 1), 10)) {
        return false;
    }
    for (c = 0; c <= 9; c++) {
        mr += a.charAt(c);
    }
    if (eval(mr.split('').join('+')) % 10 != parseInt(a.substr(10, 1), 10)) {
        return false;
    }

    if (validateTC(a) == false) {
        return false;
    }
    return true;
}

function Register() {
    if (RegisterControl()) {
        Blok();
        var model = {
            FirstName: $("#adi").val(),
            LastName: $("#soyadi").val(),
            Nationality: $('#uyruk option:selected').val(),
            TcIdentity: $("#tcidentity").val(),
            BirthDate: $("#birthdate").val(), //burası yok mesala
            GenderCode: $("#cinsiyet").val(), // burası düzenlenecek
            Gender: $("#cinsiyet").val(),
            Email: $("#email").val(),
            MobilePhone: $("#telefon").val(),
            Password: $("#passwordregister").val(),
            OrganizationType: "Bus"
        };
        
        $.ajax({
            type: "POST",
            url: '/tr/Bus/Register',
            //contentType: 'application/x-www-form-urlencoded',
            data: model,
            success: function (data) {
                
                UnBlok();
                if (data != '' && data != undefined && data.isSuccess) {
                    ShowSuccessMessage(data.statusMessage);
                    //window.location.href = "/" + jsLang + "/Budo/";
                    
                } else {
                    ShowErrorMessage(data.statusMessage);
                }

            }
        });
    }
}


function Login() {
    if ($('#username').val() == '' ||  $('#password').val() == '') {

        ShowErrorMessage('Üye girişi yapabilmeniz için email ve şifrenizi girmelisiniz.');
        return;
    }
    Blok();
    var model = {
        Username: $("#username").val(),
        Password: $("#password").val(),
        OrganizationType: "Bus"

    };

    $.ajax({
        type: "POST",
        url: '/tr/User/Login',
        data: model,
        success: function (data) {
            //debugger;
            //console.log(data);
            UnBlok();
            if (data.isSuccess) {
                //başarılı login olmuştur.
                //ShowSuccessMessage('Başarılı bir şekilde login oldunuz. ' + data.data.fullName);
                //window.location.reload();
                window.location.href = "/tr/Bus/Myprofile";
            } else {
                //başarısız işlem.
                ShowErrorMessage(data.statusMessage);

            }
          

        }
    });
}

function UpdateUser() {

    var mobilphone = $('#telefon').val().trim().replaceAll(' ', '');
    var tckimlikno = $('#tckimlikno').val();
    var emailadres = $('#emailadres').val();
    //console.log(mobilphone);
    Blok();
    var model = {
        ContactId: $("#loyaltyId").val(),
        MobilePhone: mobilphone,
        Email: emailadres,
        TcIdentity : tckimlikno
    };

    $.ajax({
        type: "POST",
        url: '/tr/User/UpdateUser',
        data: model,
        success: function (data) {
          
            UnBlok();
            if (data.isSuccess && data.data=="OK") {
                ShowSuccessMessage(data.statusMessage);
            } else {
                //başarısız işlem.
                UnBlok();
                ShowErrorMessage(data.statusMessage);

            }


        }
    });
}

function ForgotPasswordMobil() {
    //mobile özel yazıldı.

    if (validateEmail($("#forgottenEmail").val())) {
        $('#forgottenButton').attr("disabled", "disabled");
        $.blockUI({
            css: {
                border: 'none',
                padding: '15px',
                backgroundColor: '#000',
                '-webkit-border-radius': '10px',
                '-moz-border-radius': '10px',
                opacity: .5,
                color: '#fff'
            }
        });

        $.ajax({
            type: 'POST',
            url: '/' + lang + '/Bus/ForgotPassword',
            data: { "Email": $("#forgottenEmail").val(), "OrganizationType": "Budo" },
            success: function(result) {
                if (result.isSuccess) {
                    $.unblockUI();
                    ShowSuccessMessage(result.statusMessage);
                    $('#forgottenButton').removeAttr("disabled");
                } else {
                    $.unblockUI();
                    ShowErrorMessage(result.statusMessage);
                    $('#forgottenButton').removeAttr("disabled");
                }

            }
        });

    } else {

        ShowErrorMessage(emailIncorrect);
    }
}

function ChangeForgotForm() {
    $('#loginform').hide();
    $('#forgotform').show();
}

function ChangeLoginForm() {
    $('#loginform').show();
    $('#forgotform').hide();
}