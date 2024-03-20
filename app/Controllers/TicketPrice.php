<?php

namespace App\Controllers;

use App\Models\Sefer_model;

class ticketprice extends BaseController
{
    public function ticketprice(): string
    {
        return view('ticketprice');
    }

    public function index()
    {
        // Sefer modelini yükle
        $seferModel = new Sefer_model();

        // Tüm seferleri al
        $data['seferler'] = $seferModel->findAll();

        // Görünüm dosyasına verileri aktar
        return view('ticketprice', $data);
    }
}
?>