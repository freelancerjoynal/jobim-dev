<x-app-layout>
    <div class="container mx-auto p-4">
        <!-- Page Title -->
        <h1 class="text-2xl font-bold mb-4">Job Area</h1>

        <!-- Professions Table -->
        <div class="overflow-x-auto bg-white shadow-md rounded-lg p-6">
            <table class="table w-full"> 
                <thead class="bg-gray-200">
                    <tr>
                        <th class="py-2 px-4 text-left">S.N</th>
                        <th class="py-2 px-4 text-left">Area</th>
                        
                    </tr>
                </thead>
                <tbody>
                    @isset($areas)
                        @php
                            $serial = 1;
                        @endphp
                        @foreach ($areas as $item)
                            <tr class="hover:bg-gray-100">
                               
                                
                                {{-- <td class="py-2 px-4">
                                    <a href="{{ route('professions.delete', ['id' => $item->area_id]) }}" 
                                       class="btn btn-sm btn-error" 
                                       onclick="return confirm('Are you sure you want to delete this profession?')">Delete</a>
                                </td> --}}
                                <td class="py-2 px-4">{{ $item->area_name }}</td>
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
