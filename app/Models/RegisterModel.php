<?php

namespace App\Models;

use CodeIgniter\Model;

class RegisterModel extends Model
{
    protected $table = 'kullanici'; // Kullanıcıların bulunduğu tablo adı
    protected $primaryKey = 'id'; // Tablodaki anahtar sütunun adı

    protected $allowedFields = ['adi', 'soyadi', 'birthdate','uyruk', 'tcidentity', 'cinsiyet', 'telefon', 'email', 'password']; // Kullanıcıya izin verilen alanlar

    public function register_user($userData)
    {
        // Veritabanına yeni bir kullanıcı kaydı ekle
        return $this->insert($userData);
    }
}
