<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\HotJobs;
use App\Models\JobPost; 
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Str;


use function Pest\Laravel\post;

class ApiJobPostController extends Controller
{
    public function getAllPost(Request $request)
    {
        $jobPosts = DB::table('job_posts')
            ->leftJoin('professions', 'job_posts.profession', '=', 'professions.profession_id')
            ->leftJoin('areas', 'job_posts.area', '=', 'areas.area_id')
            ->select(
                'job_posts.id',
                'job_posts.publisher',
                'professions.profession_name as profession',
                'areas.area_name as area',
                'job_posts.location',
                DB::raw('LEFT(job_posts.description, 220) as description'), // Limit description to 220 characters
                'job_posts.email',
                'job_posts.wa',
                'job_posts.imagepost', 
                'job_posts.externalLink', 
                'job_posts.created_at',
                'job_posts.updated_at'
                
            ) 
            ->orderBy('job_posts.id', 'DESC') 
            ->cursorPaginate();

        return response()->json($jobPosts);
    }


    public function getHotJobs(){
        $hotJobs = HotJobs::orderBy('id', 'desc')->get()->map(function($job) {
            $job->description = Str::limit($job->description, 180);
            return $job;
        });
        
        return $hotJobs;
    }



    public function getPostDetails(Request $req)
    {
        // Retrieve the post ID from the request
        $postid = $req->postid;

        // Query the job post by ID with the necessary joins
        $query = DB::table('job_posts')
            ->join('professions', 'job_posts.profession', '=', 'professions.profession_id')
            ->join('areas', 'job_posts.area', '=', 'areas.area_id')
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
            ->where('job_posts.id', $postid)
            ->first(); // Use `first()` to get a single record

        // Check if the query found a job post
        if ($query) {
            // Return the job post data as JSON
            return response()->json([
                'success' => true,
                'data' => $query
            ], 200);
        } else {
            // Return an error response if the job post is not found
            return response()->json([
                'success' => false,
                'message' => 'Job post not found'
            ], 200);
        }
    }







    //===============
    //Search Post

    public function searchPost(Request $request, $search)
    {
        // Validate the search parameter
        $search = trim($search);

        // Perform search
        $jobPosts = DB::table('job_posts')
            ->join('professions', 'job_posts.profession', '=', 'professions.profession_id')
            ->join('areas', 'job_posts.area', '=', 'areas.area_id')
            ->select(
                'job_posts.id',
                'job_posts.publisher',
                'professions.profession_name as profession',
                'areas.area_name as area',
                'job_posts.location',
                DB::raw('LEFT(job_posts.description, 220) as description'), // Limit description to 220 characters
                'job_posts.email',
                'job_posts.wa',
                'job_posts.imagepost',
                'job_posts.created_at',
                'job_posts.updated_at'
            )
            ->where(function ($query) use ($search) {
                // Prioritize matches in the publisher field
                $query->where('job_posts.publisher', 'like', "%{$search}%")
                    ->orWhere('job_posts.description', 'like', "%{$search}%");
            })
            ->orderByRaw("CASE 
                WHEN job_posts.publisher LIKE ? THEN 1
                ELSE 2
            END", ["%{$search}%"])
            ->orderBy('job_posts.id', 'DESC') // Secondary sorting
            ->cursorPaginate(10); // Number of results per page

        return response()->json($jobPosts);
    }
}
