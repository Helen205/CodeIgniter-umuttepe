<?php

namespace App\Controllers;


use App\Models\UserModel;
class register extends BaseController
{
    public function register(): string
    {
        return view('register');
    }
    public function register1()
    {
        // AJAX isteğiyle gelen verileri al
        $model = $this->request->getPost();

        // Model yüklemesi yaparak işlemleri gerçekleştirin
        $userModel = new UserModel();

        // Veritabanına kullanıcıyı kaydet
        $result = $userModel->saveUser($model);

        // AJAX isteğine uygun yanıtı oluşturun
        $response = [
            'isSuccess' => $result,
            'statusMessage' => $result ? "Kullanıcı başarıyla kaydedildi." : "Kullanıcı kaydedilemedi."
        ];

        // JSON formatında yanıtı döndür
        return $this->response->setJSON($response);
    }
}
