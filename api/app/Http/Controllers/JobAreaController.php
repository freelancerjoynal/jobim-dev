<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;

class JobAreaController extends Controller
{
    //show job area

    public function showJobArea(){

        $jobAreas = Area::get();

        return view('jobarea.jobarea')->with('areas', $jobAreas);
    }
}
