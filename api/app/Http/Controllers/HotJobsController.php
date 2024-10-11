<?php

namespace App\Http\Controllers;

use App\Models\HotJobs;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class HotJobsController extends Controller
{
    // Show hot jobs in the admin panel
    public function showHotJobs()
    {
        $hotjobs = HotJobs::orderBy('id', 'desc')->get();

        return view('hotjobs.hotjobsview')->with('hotjobs', $hotjobs);
    }

    // Handle new hot job image upload
    public function addNewHotJob(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'externalUrl' => 'required|string|max:1000',
            'description' => 'required|string|max:1000',
        ]);

        // Insert the validated data into the hotJobs table
        $sql = HotJobs::insert([
            'title' => $validatedData['title'], 
            'externalUrl' => $validatedData['externalUrl'], 
            'description' => $validatedData['description'], 
        ]);

        if ($sql) {
            return redirect()->back()->with('success', 'New hot job has been added successfully.');
        } else {
            return redirect()->back()->with('error', 'An unknown error occurred');
        }        
    }

    public function deleteHotJob($id)
    {
        // Logic to delete the hot job with the given ID
        // For example:
        $hotJob = HotJobs::find($id);
        if ($hotJob) {
            $hotJob->delete();
            return redirect()->back()->with('success', 'Hot job deleted successfully.');
        } else {
            return redirect()->back()->with('error', 'Hot job not found.');
        }
    }


}
