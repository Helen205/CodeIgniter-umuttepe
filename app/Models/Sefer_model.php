<?php

namespace App\Models;

use CodeIgniter\Model;

class Sefer_model extends Model
{
    protected $table = 'sefer';

    public function getAllSefer()
    {
        return $this->findAll(); // Tüm seferleri getir
    }
}