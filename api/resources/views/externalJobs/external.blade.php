<x-app-layout>
    <div class="container mx-auto p-4">
        <!-- Display Success Message -->
        @if(session('success'))
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span class="block sm:inline">{{ session('success') }}</span>
            </div>
        @endif

        <!-- Page Title -->
        <h1 class="text-2xl font-bold mb-4 text-center">External Job Post</h1>

        <!-- Data Table -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <div class="text-right">
                <button class="btn btn-success text-white" onclick="newHotJob.showModal()">Insert New</button>
            <dialog id="newHotJob" class="modal">
                <div class="modal-box">
                    <div>
                        <form id="addnew" method="POST" action="{{ route('create.external.job') }}">
                            @csrf
                            <h2 class="text-2xl font-bold mb-6 text-center">Add New Hot Job</h2>
                            <div class="form-control mb-4">
                                <label for="publisher" class="label">
                                    <span class="label-text font-semibold">Title</span>
                                </label>
                                <input required type="text" name="publisher" id="publisher" placeholder="Enter title" class="input input-bordered w-full text-right" />
                            </div>

                            <div class="form-control mb-4">
                                <label for="externalLink" class="label">
                                    <span class="label-text font-semibold">External Link</span>
                                </label>
                                <input required type="url" name="externalLink" id="url" placeholder="Enter external link" class="input input-bordered w-full text-right" />
                            </div>

                            <div class="form-control mb-4">
                                <label for="description" class="label">
                                    <span class="label-text font-semibold">Description</span>
                                </label>
                                <textarea required name="description" id="description" rows="5" placeholder="Enter description" class="textarea textarea-bordered w-full text-right"></textarea>
                            </div>

                            <div class="form-control mt-6">
                                <button type="submit" class="btn btn-primary w-full">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div class="modal-action">
                        <form method="dialog">
                            <button class="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
            </div>
            <table id="example" class="display min-w-full text-right">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="py-2 px-4">Action</th>
                        <th class="py-2 px-4">Link</th>
                        <th class="py-2 px-4">Description</th>
                        <th class="py-2 px-4">Publisher</th>
                        <th class="py-2 px-4">S.N</th>
                    </tr> 
                </thead>
                <tbody>

                    @isset($jobPosts)
                    @php
                        $serial = 1;
                    @endphp
                        @foreach ($jobPosts as $item)
                        <tr>

                            <td>
                                <form action="{{ route('job-posts.destroy', $item->id) }}" method="POST" onsubmit="return confirm('Are you sure you want to delete this job post?');">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-xs btn-error">X</button>
                                </form>
                            </td>
                            <td> {{ \Illuminate\Support\Str::words($item->externalLink, 15, '...') }} </td>
                            <td> {{ \Illuminate\Support\Str::words($item->description, 15, '...') }} </td>
                            
                           
                            <td> {{$item->publisher}} </td>
                            <td>{{$serial}}</td>
                        </tr>  
                        @php
                            $serial = $serial+1;
                        @endphp
                        @endforeach
                    @endisset
                </tbody>
            </table>
        </div>
    </div>

    <!-- Include jQuery and DataTables -->
    
    

    <!-- Initialize DataTable -->
    <script>
        $(document).ready(function() {
            $('#example').DataTable();
        });
    </script>
</x-app-layout>
