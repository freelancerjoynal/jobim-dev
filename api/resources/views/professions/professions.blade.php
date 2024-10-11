<x-app-layout>
    <div class="container mx-auto p-4">
        <!-- Page Title -->
        <h1 class="text-2xl font-bold mb-4">Professions</h1>

        <!-- Display Flash Messages -->
        @if(session('success'))
            <div class="bg-green-100 text-green-800 border border-green-300 rounded-lg p-4 mb-4">
                {{ session('success') }}
            </div>
        @elseif(session('error'))
            <div class="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4 mb-4">
                {{ session('error') }}
            </div>
        @endif

        <!-- Add Profession Form -->
        <div class="mb-6 bg-white shadow-md rounded-lg p-6">
            <form action="{{ route('create.professions') }}" method="POST">
                @csrf
                <div class="flex items-center">
                    <div class="w-full mr-4">
                        <label for="profession" class="block text-sm font-medium text-gray-700 text-right">New Profession</label>
                        <input type="text" id="profession" name="profession" class="input input-bordered w-full text-right" placeholder="Enter profession" required>
                    </div>
                    <div>
                        <button type="submit" class="btn btn-primary mt-6">Add Profession</button>
                    </div>
                </div>
            </form>
        </div>

        <!-- Professions Table -->
        <div class="overflow-x-auto bg-white shadow-md rounded-lg p-6">
            <table class="table w-full text-right">
                <thead class="bg-gray-200">
                    <tr>         
                        <th class="py-2 px-4 text-left">Action</th>
                        <th class="py-2 px-4 text-left">Profession</th>
                        <th class="py-2 px-4 text-left">S.N</th>
                    </tr>
                </thead>
                <tbody>
                    @isset($professions)
                        @php
                            $serial = 1;
                        @endphp
                        @foreach ($professions as $item)
                            <tr class="hover:bg-gray-100">
                               
                                
                                <td class="py-2 px-4">
                                    <a href="{{ route('professions.delete', ['id' => $item->profession_id]) }}" 
                                       class="btn btn-sm btn-error" 
                                       onclick="return confirm('Are you sure you want to delete this profession?')">Delete</a>
                                </td>
                                <td class="py-2 px-4">{{ $item->profession_name }}</td>
                                <td class="py-2 px-4">{{ $serial }}</td>
                            </tr>
                            @php
                                $serial = $serial + 1;
                            @endphp
                        @endforeach
                    @endisset
                </tbody>
            </table>
        </div>
    </div>
</x-app-layout>
