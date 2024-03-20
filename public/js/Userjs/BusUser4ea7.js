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




function ChangeForgotForm() {
    $('#loginform').hide();
    $('#forgotform').show();
}

function ChangeLoginForm() {
    $('#loginform').show();
    $('#forgotform').hide();
}