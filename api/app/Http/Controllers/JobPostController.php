<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobPost;
use Illuminate\Support\Facades\DB;

class JobPostController extends Controller
{
    public function getAllJobPost()
    {
        $jobPosts = DB::table('job_posts')
            ->leftJoin('professions', 'job_posts.profession', '=', 'professions.profession_id') // Use leftJoin
            ->leftJoin('areas', 'job_posts.area', '=', 'areas.area_id') // Use leftJoin
            ->select(
                'job_posts.id',
                'job_posts.publisher',
                'professions.profession_name as profession',
                'areas.area_name as area',
                'job_posts.location',
                'job_posts.description',
                'job_posts.email',
                'job_posts.wa',
                'job_posts.imagepost',
                'job_posts.created_at',
                'job_posts.updated_at'
            )
            ->orderBy('job_posts.id', 'DESC') // Order by id descending
            ->get();

        // Return view with the job posts data
        return view('dashboard')->with('jobPosts', $jobPosts);
    }




    public function showExternalJobs(){
        $jobPosts = DB::table('job_posts')
            ->leftJoin('professions', 'job_posts.profession', '=', 'professions.profession_id') // Use leftJoin
            ->leftJoin('areas', 'job_posts.area', '=', 'areas.area_id') // Use leftJoin
            ->select(
                'job_posts.id',
                'job_posts.publisher',
                'professions.profession_name as profession',
                'areas.area_name as area',
                'job_posts.location',
                'job_posts.description',
                'job_posts.email',
                'job_posts.wa',
                'job_posts.imagepost',
                'job_posts.externalLink', 
                'job_posts.created_at',
                'job_posts.updated_at'
            )
            ->whereNotNull('job_posts.externalLink') // Only select where externalLink is not null
            ->orderBy('job_posts.id', 'DESC') // Order by id descending
            ->get();
    
        // Return view with the job posts data
        return view('externalJobs.external')->with('jobPosts', $jobPosts);
    }
    
    
    public function externalJobCreation(Request $request){
        $validatedData = $request->validate([
            'publisher' => 'required|string|max:255',
            'description' => 'required',
            'externalLink' => 'required|string|max:1000',
        ]);

        // Insert the validated data into the hotJobs table
        $sql = JobPost::insert([
            'publisher' => $validatedData['publisher'], 
            'externalLink' => $validatedData['externalLink'], 
            'description' => $validatedData['description'], 
        ]);

        if ($sql) {
            return redirect()->back()->with('success', 'New External job has been added successfully.');
        } else {
            return redirect()->back()->with('error', 'An unknown error occurred');
        }
    }




    public function destroy($id)
    {
        $jobPost = JobPost::findOrFail($id);

        // Check if the job post has an image
        if ($jobPost->imagepost !== null) {
            $imagePath = public_path($jobPost->imagepost);

            // Check if the file exists and delete it
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        // Delete the job post from the database
        $jobPost->delete();

        return redirect()->back()->with('success', 'Job post deleted successfully!');
    }




}
