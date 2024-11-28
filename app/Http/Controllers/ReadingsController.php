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
            'readings.reading',
            'readings.reading_date',
            'meters.meter_name as meter_name'
        )
            ->join('meters', 'meters.id', '=', 'readings.meter_id')
            ->when($search, function ($query) use ($search) {
                $query->where('readings.reading', 'like', "%$search%")
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
        sleep(1);

        $fields = $request->validate([
            'meter_id' => ['required'],
            'reading' => ['required'],
            'reading_date' => ['required']
        ]);
        Readings::create($fields);
        return redirect('/reading')->with('fields', $request->all());
    }
    public function show($id)
    {
        $meter  = Meter::select('id', 'meter_name')->get();

        $data = Readings::join('meters', 'meters.id', '=', 'readings.meter_id')
            ->where('readings.id', $id)
            ->select(
                'readings.id',
                'readings.meter_id',
                'readings.reading',
                'readings.reading_date',
                'meters.meter_name as meter_name'
            )
            ->firstOrFail($id);


        return Inertia::render('Modules/Readings/ShowUpdateDelete', [
            'reading' => $data,
            'meter' => $meter,
        ]);
    }
    public function update(Request $request, $id)
    {
        $data = Readings::findOrFail($id);
        $validated = $request->validate(rules: [
            'meter_id' => 'required|string|max:255',
            'reading' => 'required|string|max:255',
            'reading_date' => 'required|date',
        ]);
        $data->update($validated);

        return redirect('/reading');
    }
    public function destroy($id)
    {
        $data = Readings::findOrFail($id);
        $data->delete();
        return redirect('/reading');
    }
}
