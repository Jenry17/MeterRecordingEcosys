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
            'readings.consumption',
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
        $meterData = Meter::select('id', 'meter_name')->get();
        return Inertia::render('Modules/Readings/Create', [
            'reading' => $meterData,
        ]);
    }
    public function store(Request $request)
    {
        $present_reading = (int) $request->reading;
        $max_digit = 9999;

        $previous_reading_data = Readings::where('meter_id', $request->meter_id)
            ->orderBy('id', 'desc')
            ->first();

        $previous_reading = $previous_reading_data && is_numeric($previous_reading_data->reading)
            ? (int) $previous_reading_data->reading
            : null;

        $previous_reading_date = $previous_reading_data ? $previous_reading_data->reading_date : null;

        if ($previous_reading_date && date('Y-m', strtotime($request->reading_date)) == date('Y-m', strtotime($previous_reading_date))) {
            // Use validation to return a structured error message as an object
            return redirect('/reading/create')->withErrors([
                'reading_date' => 'The reading date cannot be in the same month and year as the previous reading.'
            ]);
        }

        if ($previous_reading_date && strtotime($request->reading_date) <= strtotime($previous_reading_date)) {
            return redirect('/reading/create')->withErrors([
                'reading_date' => 'The provided reading date must be later than the previous reading date.'
            ]);
        }

        if (is_null($previous_reading)) {
            Readings::create([
                'meter_id' => $request->meter_id,
                'reading' => $present_reading,
                'reading_date' => $request->reading_date,
                'consumption' => $present_reading
            ]);

            return redirect('/reading')->with('success', 'First reading saved successfully.');
        }

        $max_variable = $max_digit + 1;
        $consumption = 0;

        if ($present_reading < $previous_reading) {
            $consumption = ($max_variable - $previous_reading) + $present_reading;
        } else {
            $consumption = $present_reading - $previous_reading;
        }

        Readings::create([
            'meter_id' => $request->meter_id,
            'reading' => $present_reading,
            'reading_date' => $request->reading_date,
            'consumption' => $consumption
        ]);

        return redirect('/reading')->with('success', 'Reading saved successfully.');
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
