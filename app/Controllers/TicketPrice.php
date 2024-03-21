<?php

namespace App\Controllers;

use App\Models\Sefer_model;

class TicketPrice extends BaseController
{
    public function ticketprice()
    {
        // Sefer saatleri ve ücretlerini almak için Sefer_model'i kullan
        $seferModel = new Sefer_model();
        $data['seferSaatlerUcretler'] = $seferModel->getSeferSaatUcret();

        // Görünüm dosyasına verileri aktar
        return view('ticketprice', $data);
    }

    public function getBiletFiyatlari()
    {
        // AJAX isteğinden sefer saatini al
        $seferSaat = $this->request->getPost('seferSaat');

        // Sefer_model'i kullanarak bilet fiyatlarını al
        $seferModel = new Sefer_model();
        $biletFiyatlari = $seferModel->getBiletFiyatlariBySeferSaat($seferSaat);

        // Bu metodun AJAX isteği için kullanıldığını varsayarak sonucu JSON olarak döndür
        return $this->response->setJSON(['biletFiyatlari' => $biletFiyatlari]);
    }
}
