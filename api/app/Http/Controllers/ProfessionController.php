<?php

namespace App\Http\Controllers;

use App\Models\Profession; // Ensure this is correctly named
use Illuminate\Http\Request;

class ProfessionController extends Controller
{
    // Load professions to the admin
    public function showProfessions()
    {
        $professions = Profession::orderBy('profession_id', 'desc')->get();
        return view('professions.professions')->with('professions', $professions);
    }

    // Create Profession 
    public function createProfession(Request $req)
    {
        $professionName = trim($req->profession); // Renamed to professionName for clarity

        $profession = new Profession();
        $profession->profession_name = $professionName;
        $profession->save();

        return redirect()->back()->with('success', 'Profession added successfully!');
    }

    public function deleteProfession($profession_id)
    {

        
        // Find the profession by ID
        $profession = Profession::where('profession_id',$profession_id)->get();
       

        if ($profession) {
            // Delete the profession
            $profession = Profession::where('profession_id',$profession_id)->delete();

            // Redirect back with success message
            return redirect()->back()->with('success', 'Profession deleted successfully!');
        } else {
            // Redirect back with error message if the profession was not found
            return redirect()->back()->with('error', 'Profession not found.');
        }
    }

}
