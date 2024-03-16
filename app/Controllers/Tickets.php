<?php

namespace App\Controllers;

class tickets extends BaseController
{
    public function tickets(): string
    {
        return view('tickets');
    }
}