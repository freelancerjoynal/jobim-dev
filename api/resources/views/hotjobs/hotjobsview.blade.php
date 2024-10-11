<x-app-layout>
    <div class="container mx-auto mt-6">
        <h1 class="text-2xl lg:text-4xl font-bold text-center uppercase">Hot Jobs</h1>
        <br><hr>

        <!-- Display success or error messages -->
        @if (session('success'))
            <div role="alert" class="alert alert-success">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m2 5v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4a1 1 0 011-1h12a1 1 0 011 1z" />
                </svg>
                <span>{{ session('success') }}</span>
            </div>
        @endif

        @if (session('error'))
            <div role="alert" class="alert alert-error">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{{ session('error') }}</span>
            </div>
        @endif

        <div class="bg-white p-3 rounded-md">
            <table id="example" class="display min-w-full text-right">
                <div class="text-right mb-3">
                    <button class="btn btn-success text-white" onclick="newHotJob.showModal()">Insert New</button>
                    <dialog id="newHotJob" class="modal text-right">
                        <div class="modal-box">
                            <div>
                                <form id="addnew" method="POST" action="{{ route('create.external.job') }}">
                                    @csrf
                                    <h2 class="text-2xl font-bold mb-6 text-center">Add New Hot Job</h2>
                                    <div class="form-control mb-4">
                                        <label for="title" class="label">
                                            <span class="label-text font-semibold">Title</span>
                                        </label>
                                        <input required type="text" name="title" id="title" placeholder="Enter title" class="input input-bordered w-full text-right" />
                                    </div>

                                    <div class="form-control mb-4">
                                        <label for="externalUrl" class="label">
                                            <span class="label-text font-semibold">External Link</span>
                                        </label>
                                        <input required type="text" name="externalUrl" id="url" placeholder="Enter external link" class="input input-bordered w-full text-right" />
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

                <thead class="bg-gray-200">
                    <tr>
                        <th class="py-2 px-4">Action</th>
                        <th class="py-2 px-4">Description</th>
                        <th class="py-2 px-4">Title</th>
                        <th class="py-2 px-4">URL</th>
                        <th class="py-2 px-4">S.N</th>
                    </tr>
                </thead>
                <tbody>
                    @isset($hotjobs)
                        @php
                            $serial = 1;
                        @endphp
                        @foreach ($hotjobs as $item)
                        <tr>
                            <td>
                                <a href="{{ route('delete.hot.job', ['id' => $item->id]) }}" onclick="return confirm('Are you sure?')" class="btn btn-error">X</a>
                            </td>
                            <td>{{ \Illuminate\Support\Str::limit($item->description, 60, '...') }}</td>
                            <td>{{ \Illuminate\Support\Str::limit($item->externalUrl, 20, '...') }}</td>
                            <td>{{ \Illuminate\Support\Str::limit($item->title, 50, '...') }}</td>
                            <td>{{ $serial++ }}</td>
                        </tr>
                        
                        @endforeach     
                    @endisset
                </tbody>
            </table>
        </div>
    </div>
    <script>
        $(document).ready(function() {
            $('#example').DataTable();
        });
    </script>
</x-app-layout>
