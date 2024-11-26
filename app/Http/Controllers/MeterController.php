<?php

namespace App\Http\Controllers;

use App\Http\Resources\DepartmentResource;
use Inertia\Inertia;
use App\Models\Meter;
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
         // Extract search query from the request
         $search = $request->input('search', ''); // Default to empty string if not provided
     
         // Query the Meter model with the necessary join and selection
         $query = Meter::select(
                 'meters.id',
                 'meters.department_id',
                 'meters.meter_name',
                 'meters.serial_number',
                 'companies.company_name as department_name' // Assuming `company_name` is the correct column
             )
             ->join('companies', 'companies.id', '=', 'meters.department_id'); // Change to `meters.company_id` if applicable
     
         // Apply search filtering across all data
         if (!empty($search)) {
             $query->where(function ($subQuery) use ($search) {
                 $subQuery->where('meters.meter_name', 'like', '%' . $search . '%')
                     ->orWhere('meters.serial_number', 'like', '%' . $search . '%')
                     ->orWhere('companies.company_name', 'like', '%' . $search . '%'); // Adjust field names as necessary
             });
         }
     
         // Paginate the results with a default limit of 5 per page
         $meterData = $query->paginate(5)->appends(['search' => $search]); // Add `search` to pagination links
     
         // Render the paginated data with Inertia
         return Inertia::render('Meters', [
             'meter' => $meterData,
             'filters' => [
                 'search' => $search, // Pass search query back to the frontend for display
             ],
         ]);
     }
     

//     public function index(Request $request)
//     {
//         // Extract search query and page number from the request
// $search = $request->input('search', ''); // Default to empty string if not provided
// $page = $request->input('page', 1); // Default to 1 if not provided

// // Query the Meter model with the necessary join and selection
// $query = Meter::select(
//         'meters.id',
//         'meters.department_id',
//         'meters.meter_name',
//         'meters.serial_number',
//         'companies.company_name as department_name' // Assuming `company_name` is the correct column
//     )
//     ->join('companies', 'companies.id', '=', 'meters.department_id'); // Change to `meters.company_id` if applicable

// // Apply search filtering if a search query is provided
// if (!empty($search)) {
//     $query->where('meters.meter_name', 'like', '%' . $search . '%');
// }

// // Paginate the results with a default limit of 5 per page
// $meterData = $query->paginate(2, ['*'], 'page', $page);

// // Render the paginated data with Inertia
// return Inertia::render('Meters', [
//     'meter' => $meterData,
// ]);


//     }

    // public function index()
    // {
    //     $meterData = Meter::select( 'id', 'department_id', 'meter_name', 'serial_number')->paginate(5);
    //     return Inertia::render('Meters', [
    //         'meter' => $meterData,
    //     ]);
    // }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $companyData = Company::select('id', 'company_name', 'company_code')->paginate(5);
        return Inertia::render('Modules/Meters/MeterCreate', [
            'companies' => $companyData,
        ]);


        // return Inertia::render('Modules/Meters/MeterCreate');
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        sleep(2);

        $request->validate([
            'department_id' => 'required|string|max:255',
            'meter_name' => 'required|string|max:255', // No unique rule for meter_name
            'serial_number' => [
                'required',
                'string',
                'max:255',
                Rule::unique('meters', 'serial_number'), // Serial number must still be unique globally
            ],
        ]);

        // Create the new meter record
        Meter::create($request->only(['department_id', 'meter_name', 'serial_number']));

        return redirect('/meter');
    }



    // public function store(Request $request)
    // {
    //     sleep(2);

    //     $fields = $request->validate([
    //         'department_id' => 'required|string|max:255',
    //         'meter_name' => 'required|string|max:255',
    //         'serial_number' => 'required|string|max:255',
    //     ]);

    //     Meter::create($fields);
    //     return redirect('/meter');
    // }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        /// Fetch the post from the database by its ID
        $meters = meter::findOrFail($id);

        // Return the post data to the Inertia page
        return Inertia::render('Modules/Meters/ShowUpdateDelete', [
            'meter' => $meters
        ]);
        // $company = Company::select('id', 'company_name', 'company_code')->get();
        // return Inertia::render('Modules/Company/ShowUpdateDelete', [
        //     'companies' => $company,
        // ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Meter $meter)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = meter::findOrFail($id);
        $validated = $request->validate(rules: [
            'department_id' => 'required|string|max:255',
            'meter_name' => 'required|string|max:255',
            'serial_number' => 'required|string|max:255',

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
