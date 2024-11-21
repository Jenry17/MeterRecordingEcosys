<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Department;
use App\Http\Requests\UpdateDepartmentRequest;
use App\Models\Company;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Department::select(
            'departments.id',
            'departments.department_name',
            'departments.department_code',
            'departments.company_id',
            'companies.company_name as company_name' // Assuming `name` is a column in `companies`
        )
            ->join('companies', 'companies.id', '=', 'departments.company_id') // Change to `meters.company_id` if needed
            ->paginate(5);

        return Inertia::render('Department', props: [
            'department' => $data,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $data = Company::select('id', 'company_name')->get();
        return Inertia::render('Modules/Department/Create', [
            'department' => $data,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        sleep(1);

        $fields = $request->validate([
            'department_name' => ['required'],
            'department_code' => ['required'],
            'company_id' => ['required']
        ]);

        Department::create($fields);
        return redirect('/department');
        // return redirect()->route('department.index', [ 'data' => $fields]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $data = Department::findOrFail($id);

        // Return the post data to the Inertia page
        return Inertia::render('Modules/Department/ShowUpdateDelete', [
            'department' => $data
        ]);
    }
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        //
    }
}
