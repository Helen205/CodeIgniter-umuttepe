<?php

namespace App\Models;

use CodeIgniter\Model;

class Sefer_model extends Model
{
    protected $table = 'sefer';
    protected $allowedFields = ['sefer_saat', 'ucret'];

    public function getAllSefer()
    {
        return $this->findAll();
    }

    public function getSeferSaatUcret()
    {
        return $this->select('sefer_saat, ucret')->findAll();
    }
    public function getBiletFiyatlariBySeferSaat($seferSaat)
{
    return $this->select('ucret')->where('sefer_saat', $seferSaat)->findAll();
}

}
