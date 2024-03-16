<?php

namespace App\Controllers;

class login extends BaseController
{
    public function login(): string
    {
        return view('login');
    }
}
