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
        $data = Readings::where('meter_id', $request->meter_id)
        ->select('reading')  // Select only the 'reading' field
        ->orderBy('id', 'desc')  // Order by the 'id' (assuming it's auto-incremented)
        ->first();  // Get the first record (most recent)
        $meterData = Meter::select('id', 'meter_name')->get();

        return Inertia::render('Modules/Readings/Create', [
            'reading' => $meterData,
            'datas' => $data,
        ]);
    }

    public function store(Request $request)
    {
        //     $fields = $request->validate([
        //         'meter_id' => ['required'],
        //         'reading' => ['required'],
        //         'reading_date' => ['required']
        //     ]);
        //     Readings::create($fields);
        //     return redirect('/reading')->with('fields', $request->all());



        $present_reading = (int)$request->reading;  // Ensure it's treated as an integer
        $max_digit = 9999;

        $previous_reading = $request->data;

        // Retrieve the previous reading for the specific meter from the database
        // $previous_reading = Readings::where('meter_id', $request->meter_id)
        //     ->select('reading')  // Select only the 'reading' field
        //     ->orderBy('id', 'desc')  // Order by the 'id' (assuming it's auto-incremented)
        //     ->first();  // Get the first record (most recent)


        // If there is no previous reading, set it to 0 (or you could handle this case differently)
        if ($previous_reading) {
            $previous_reading = (int)$previous_reading->reading;  // Ensure previous reading is an integer
        } else {
            $previous_reading = 0; // Default value, assuming no previous readings.
        }

        // Check if present reading is not lower than the previous reading
        if ($present_reading < $previous_reading) {
            // return $previous_reading  . $present_reading;
            return redirect('/reading')->with('');
        }

        // Adjusted reading logic based on max_digit
        $max_variable = $max_digit + 1;  // $max_digit + 1
        if ($present_reading > $max_digit) {
            // Calculate new reading when the present reading exceeds max_digit
            $new_reading = $present_reading - $max_variable; // Subtract max_variable from present reading
        } else {
            // If present reading is within max_digit range and greater than previous reading, use the normal calculation
            if ($present_reading > $previous_reading) {
                $new_reading = $present_reading - $previous_reading;
            } else {
                // Handle case when present reading is less than or equal to previous reading
                $new_reading = 0;  // Or any other value you want to set in this case
            }
        }


        // Validate incoming fields
        // $fields = $request->validate([
        //     'meter_id' => ['required'],
        //     'reading_date' => ['required'],
        //     'reading' => ['required'],
        // ]);

        // // Set the new calculated reading
        // $fields['reading'] = $new_reading;
        // $fields['meter_id'] = $request->meter_id;
        // $fields['reading_date'] = $request->reading_date;

        return $new_reading;


        // Save the new reading to the database
        // Readings::create($fields);

        // // Redirect back with success message
        // return redirect('/reading')->with('fields', $fields);
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
