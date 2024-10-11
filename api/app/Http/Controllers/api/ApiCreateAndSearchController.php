<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Controllers\api\ApiJobPostController;
use App\Models\Area;
use App\Models\JobPost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

class ApiCreateAndSearchController extends Controller
{
    // Get all taxonomy data
    public function getProfessions()
    {

        // Retrieve all professions
        $professions = DB::table('professions')
            ->select('profession_id', 'profession_name')
            ->get();

        return response()->json($professions);
    }

    public function getAreas()
    {

        // Retrieve all professions
        $areas = Area::get();

        return response()->json($areas);
    }



    public function filterPost(Request $req)
    {
        $profession_id = $req->input('profession_id');
        $area_id = $req->input('area_id');

        // Start with a base query
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
            ->orderBy('job_posts.id', 'DESC'); // Order by id descending

        // Conditionally apply filters
        if ($profession_id) {
            $query->where('job_posts.profession', $profession_id);
        }

        if ($area_id) {
            $query->where('job_posts.area', $area_id);
        }

        // Paginate results
        $posts = $query->paginate(20); // Using standard paginate instead of cursorPaginate

        return response()->json($posts);
    }






    public function createPost(Request $req)
    {
        // Validate the incoming request data
        $validatedData = $req->validate([
            'publisher' => 'required|string|max:255',
            'profession' => 'required|string|max:255',
            'area' => 'required|string|max:255',
            'location' => 'nullable|string|max:255',  // Location is not required
            'description' => 'required|string',
            'email' => 'required|email|max:255',
            'wa' => 'nullable|string|max:255',  // WhatsApp (wa) is not required
        ]);

        try {
            // Attempt to insert data into the jobPost table
            $query = JobPost::insert([
                'publisher' => $validatedData['publisher'],
                'profession' => $validatedData['profession'],
                'area' => $validatedData['area'],
                'location' => $validatedData['location'],
                'description' => $validatedData['description'],
                'email' => trim($validatedData['email']),
                'wa' => trim($validatedData['wa']),
            ]);

            // Check if the insert operation was successful
            if ($query) {
                // Fetch the paginated list of posts
                $jobPosts = DB::table('job_posts')
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
                    ->orderBy('id', 'DESC') // Order by id descending
                    ->cursorPaginate();

                return response()->json([
                    'message' => 'Post created successfully',
                    'posts' => $jobPosts
                ], 201);
            } else {
                return response()->json(['error' => 'Failed to create post'], 500);
            }
        } catch (\Exception $e) {
            // Handle any exceptions that occur
            return response()->json(['error' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }


    public function createImagePost(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:1024',
        ]);
    
        // Handle the uploaded file
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            
            // Create the 'public/uploads' directory if it doesn't exist
            $destinationPath = public_path('uploads');
            if (!file_exists($destinationPath)) {
                mkdir($destinationPath, 0755, true);
            }
    
            // Get the original file name
            $fileName = time() . '-' . $image->getClientOriginalName();
            
            // Move the image to the 'public/uploads' directory
            $image->move($destinationPath, $fileName);
    
            // Save the path relative to 'public' in the database
            $path = 'uploads/' . $fileName;
    
            // Insert the image path into the database
            $sql = JobPost::insert([
                'imagepost' => $path
            ]);
    
            if ($sql) {
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
                        'job_posts.created_at',
                        'job_posts.updated_at',
                        'job_posts.imagepost' 
                    )
                    ->orderBy('job_posts.id', 'DESC') // Order by id descending
                    ->cursorPaginate();
    
                return response()->json($jobPosts);
            }
        }
    
        return response()->json(['message' => 'Image upload failed'], 400);
    }
    
}
