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
            ->paginate(10);

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
        $present_reading = (int)$request->reading;  // Ensure it's treated as an integer
        $max_digit = 9999;

        // Retrieve the previous reading for the specific meter from the database
        $previous_reading = Readings::where('meter_id', $request->meter_id)
            ->orderBy('reading_date', 'desc')
            ->first();

        // If there is no previous reading, set it to 0 (or you could handle this case differently)
        if ($previous_reading) {
            $previous_reading = (int)$previous_reading->reading;  // Ensure previous reading is an integer
        } else {
            $previous_reading = 0; // Default value, assuming no previous readings.
        }

        // Check if present reading is not lower than the previous reading
        if ($present_reading < $previous_reading) {
            return view('reading/create')->with('error', 'Present reading cannot be lower than previous reading.');
        }


        // Continue with the adjusted value calculation
        $adjusted_value = $max_digit + 1 + $present_reading; // Now all values are integers
        $new_reading = $adjusted_value - $previous_reading;

        // Validate incoming fields
        $fields = $request->validate([
            'meter_id' => ['required'],
            'reading_date' => ['required'],
            'reading' => ['required'],
        ]);

        // Set the new calculated reading
        $fields['reading'] = $new_reading;
        $fields['meter_id'] = $request->meter_id;
        $fields['reading_date'] = $request->reading_date;

        // return  $fields;
        // Save the new reading to the database
        Readings::create($fields);

        // Redirect back with success message
        return redirect('/reading')->with('fields', $fields);



        // sleep(1);
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
