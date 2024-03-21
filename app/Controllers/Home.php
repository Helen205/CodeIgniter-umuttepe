<?php

namespace App\Controllers;

use CodeIgniter\Controller;

class Home extends Controller
{
    public function index()
    {
        return view('index');
        // Formdan gelen verileri al
        $request = service('request');
        $gidisTarihi = $request->getPost('GidisTarihi');
        $nereden = $request->getPost('NeredenText');
        $nereye = $request->getPost('NereyeText');

        // Model çağırarak verileri al
        $seferModel = new \App\Models\Filtre_model();
        $seferler = $seferModel->getSeferler($gidisTarihi, $nereden, $nereye);

        // View'e verileri gönder
        $data['seferler'] = $seferler;
        return view('voyage', $data);
        
    }
}
