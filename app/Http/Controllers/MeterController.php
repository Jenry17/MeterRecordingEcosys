<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentResource;
use Inertia\Inertia;
use App\Models\Meter;
use App\Models\Department;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Http\Requests\UpdateMeterRequest;


class MeterController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function index(Request $request)
{
    $searchTerm = $request->get('search'); // Get the search term from the request

    $meterData = Meter::select(
        'meters.id',
        'meters.department_id', 
        'meters.meter_name',
        'meters.serial_number',
        'meters.max_digit',
        'departments.department_name as department_name'  // Assuming `name` is a column in `departments`
    )
    ->join('departments', 'departments.id', '=', 'meters.department_id') // Adjust if needed
    ->when($searchTerm, function($query, $searchTerm) {
        // Apply search filtering if a search term is provided
        $query->where('meters.meter_name', 'like', '%' . $searchTerm . '%')
              ->orWhere('meters.serial_number', 'like', '%' . $searchTerm . '%');
    })
    ->paginate(2);

    return Inertia::render('Meters', [
        'meter' => $meterData,
        'search' => $searchTerm, // Pass the search term to the view if you want to display it in the UI
    ]);
}



    public function create()
    {
        $companyData = Department::select('id', 'department_name')->get();
        return Inertia::render('Modules/Meters/MeterCreate', [
            'meter' => $companyData,
        ]);


        // return Inertia::render('Modules/Meters/MeterCreate');
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(Request $request)
{
    sleep(1);

    // Validate input fields
    $fields = $request->validate([
        'department_id' => ['required', 'exists:departments,id'], // Ensure department exists
        'meter_name' => ['required'],
        'serial_number' => [
            'required',
            Rule::unique('meters')->where(function ($query) use ($request) {
                return $query
                    ->where('department_id', $request->department_id)
                    ->where('meter_name', $request->meter_name);
            }),
        ],
        'max_digit' => ['required', 'numeric'], // Validate numeric value for max_digit
        'eto' => $request
    ]);

    // Create the meter record
    Meter::create($fields);

    // Redirect to the meter list
    return redirect('/meter')->with('success', 'Meter created successfully.');
}


     public function show($id)
     {
 
         $Departmentdata  = Department::select('id', 'department_name')->get();
 
         $Meterdata = Meter ::join('departments', 'departments.id', '=', 'meters.department_id')
         ->where('meters.id', $id)
         ->select(
             'meters.id',
             'meters.department_id',
             'meters.meter_name',
             'meters.serial_number',
             'meters.max_digit',
             'departments.department_name as department_name' 
         )
         ->firstOrFail($id);
 
 
         return Inertia::render('Modules/Meters/ShowUpdateDelete', [
             'meter' => $Meterdata,
             'department' => $Departmentdata,
         ]);
     }
     
    public function update(Request $request, $id)
    {
        $data = meter::findOrFail($id);
        $validated = $request->validate(rules: [
            'department_id' => 'required|string|max:255',
            'meter_name' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',
            'max_digit' => 'required|int|max:99999',

        ]);
        $data->update($validated);

        return redirect('/meter');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = meter::findOrFail($id);
        $data->delete();
        return redirect('/meter');
    }
}
