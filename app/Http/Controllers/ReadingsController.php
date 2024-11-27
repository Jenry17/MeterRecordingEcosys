<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Readings;
use App\Models\Meter;
use Illuminate\Http\Request;

class ReadingsController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search', '');

        $data = Readings::select(
            'readings.id',
            'readings.reading_date',
            'meters.meter_name as meter_name'
        )
            ->join('meters', 'meters.id', '=', 'readings.meter_id')
            ->when($search, function ($query) use ($search) {
                $query->where('readings.reading_date', 'like', "%$search%")
                    ->orWhere('meters.meter_name', 'like', "%$search%");
            })
            ->paginate(2);

        return Inertia::render('Reading', ['reading' => $data, 'search' => $search]);
    }
    public function create(Request $request)
    {
        $data = Meter::select('id', 'meter_name')->get();
        return Inertia::render('Modules/Readings/Create', [
            'reading' => $data,
        ]);
    }
    public function store(Request $request)
    {
        //
    }     public function show(Readings $readings)
    {
        //
    }
    public function edit(Readings $readings)
    {
        //
    }
    public function update(Request $request, Readings $readings)
    {
        //
    }
    public function destroy(Readings $readings)
    {
        //
    }
}
