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
            'readings.consumption', // Include consumption
            'meters.meter_name as meter_name'
        )
            ->join('meters', 'meters.id', '=', 'readings.meter_id')
            ->when($search, function ($query) use ($search) {
                $query->where('readings.reading', 'like', "%$search%")
                    ->orWhere('meters.meter_name', 'like', "%$search%");
            })
            ->paginate(10);

        return Inertia::render('Reading', ['reading' => $data, 'search' => $search]);
    }
    public function create(Request $request)
    {
        // $datas = Readings::orderBy('id', 'desc')  // Order by the 'id' (assuming it's auto-incremented)
        // ->value('reading');  // Get the value of the 'reading' field

        $meterData = Meter::select('id', 'meter_name')->get();

        return Inertia::render('Modules/Readings/Create', [
            'reading' => $meterData,
            // 'datas' => $datas,
        ]);
    }

    public function store(Request $request)
{
    $present_reading = (int) $request->reading;  // Ensure it's treated as an integer
    $max_digit = 9999;

    // Retrieve the previous reading for the specific meter from the database
    $previous_reading = Readings::where('meter_id', $request->meter_id)
        ->orderBy('id', 'desc')
        ->value('reading');

    $previous_reading = is_numeric($previous_reading) ? (int) $previous_reading : null;

    if (is_null($previous_reading)) {
        // Handle case where there is no previous reading (e.g., first entry)
        Readings::create([
            'meter_id' => $request->meter_id,
            'reading' => $present_reading,
            'reading_date' => $request->reading_date
        ]);

        return redirect('/reading')->with('success', 'Reading saved successfully.');
    }

    $max_variable = $max_digit + 1; // Total number of values before meter resets
    $consumption = 0; // Initialize consumption variable

    if ($present_reading < $previous_reading) {
        // Handle case where the meter has reset (rolled over)
        $consumption = ($max_variable - $previous_reading) + $present_reading;
    } else {
        // Normal case where the meter hasn't reset
        $consumption = $present_reading - $previous_reading;
    }

    // Save the new reading to the database
    Readings::create([
        'meter_id' => $request->meter_id,
        'reading' => $present_reading,
        'reading_date' => $request->reading_date,
        'consumption' => $consumption // Assuming you have a consumption column
    ]);
    
    // return redirect('/reading')->with('success', 'Reading saved successfully.');
    return $consumption;

}
    
    public function resetMeter()
    {
        return "taguro";
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
