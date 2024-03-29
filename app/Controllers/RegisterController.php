<?php

namespace App\Controllers;

use App\Models\RegisterModel;
use CodeIgniter\Controller;

class RegisterController extends Controller
{
    public function index()
    {
        // Kayıt formunu yükle
        return view('register');
    }

    public function register_user()
    {
        // Request objesini al
        $request = service('request');

        // Formdan gelen verileri al
        $adi = $request->getPost('adi');
        $soyadi = $request->getPost('soyadi');
        $birthdate = $request->getPost('birthdate');
        $tcidentity = $request->getPost('tcidentity');
        $cinsiyet = $request->getPost('cinsiyet');
        $telefon = $request->getPost('telefon');
        $email = $request->getPost('email');
        $password = $request->getPost('passwordregister');

        // Verileri diziye atama
        $userData = [
            'adi' => $adi,
            'soyadi' => $soyadi,
            'birthdate' => $birthdate,
            'tcidentity' => $tcidentity,
            'cinsiyet' => $cinsiyet,
            'telefon' => $telefon,
            'email' => $email,
            'password' => password_hash($password, PASSWORD_DEFAULT) // Şifreyi güvenli bir şekilde sakla
        ];

        // Pass data to the model for registration
        $registerModel = new RegisterModel();

        // Model methodunu çağırarak kayıt işlemini gerçekleştir
        $result = $registerModel->register_user($userData);

        // Handle the registration result
        if ($result) {
            // Başarılı bir kayıt işlemi
            session()->setFlashdata('success', 'Kayıt başarılı.');
            return redirect()->to('register'); // Kayıt sayfasına yeniden yönlendir
        } else {
            // Kayıt işlemi başarısız
            session()->setFlashdata('error', 'Kayıt sırasında bir hata oluştu.');
            return redirect()->back()->withInput(); // Geri dön ve form verilerini koru
        }
    }
}
