<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Department;
use App\Http\Requests\UpdateDepartmentRequest;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Department', [
            'data' => 'datos',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Modules/Department/Create', [
            //
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
    public function show(Department $department)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
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
