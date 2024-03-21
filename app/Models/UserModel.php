<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table      = 'users';
    protected $primaryKey = 'id';

    protected $allowedFields = ['adi', 'soyadi', 'birthdate', 'uyruk', 'tcidentity', 'telefon', 'email', 'password'];

    // Yeni kullanıcıyı kaydetmek için metod
    public function saveUser($userData)
    {
        // Veritabanına yeni kullanıcıyı ekle
        $this->insert($userData);
        
        // Ekleme işlemi başarılıysa true döndür
        return true;
    }
}
