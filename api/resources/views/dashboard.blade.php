<x-app-layout>
    <div class="container mx-auto p-4">
        <!-- Display Success Message -->
        @if(session('success'))
            <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span class="block sm:inline">{{ session('success') }}</span>
            </div>
        @endif

        <!-- Page Title -->
        <h1 class="text-2xl font-bold mb-4">Latest Job Post</h1>

        <!-- Data Table -->
        <div class="bg-white shadow-md rounded-lg p-6">
            <table id="example" class="display min-w-full text-right">
                <thead class="bg-gray-200">
                    <tr>
                        <th class="py-2 px-4">Action</th>
                        <th class="py-2 px-4">Description</th>
                        <th class="py-2 px-4">Profession</th>
                        <th class="py-2 px-4">Publisher</th>
                        <th class="py-2 px-4">Image</th>
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
                            <td> {{ \Illuminate\Support\Str::words($item->description, 15, '...') }} </td>
                            <td> {{$item->profession}} </td>
                            <td> 
                                @if ($item->imagepost !==null)
                                <img src="{{asset('/')}}{{$item->imagepost}}" class="w-full max-w-20"  alt="No image for this job">
                                @endif
                            </td>
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
