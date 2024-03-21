<?php

namespace App\Models;

use CodeIgniter\Model;

class Filtre_model extends Model
{
    protected $table = 'seferler'; // seferler tablosunun adını burada belirtin

    public function getSeferler($gidisTarihi, $nereden, $nereye)
    {
        // Seferler tablosundan gerekli sütunları seçerek sorguyu yap
        $seferler = $this->select('gidisTarihi, nereden, nereye')
                         ->where('gidisTarihi', $gidisTarihi)
                         ->where('nereden', $nereden)
                         ->where('nereye', $nereye)
                         ->findAll();
        
        return $seferler;
    }
}
