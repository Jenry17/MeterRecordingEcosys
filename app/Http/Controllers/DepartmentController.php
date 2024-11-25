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
            'companies.company_name as company_name'
        )
            ->join('companies', 'companies.id', '=', 'departments.company_id')
            ->paginate(5);

        return Inertia::render('Department', props: [
            'department' => $data,
        ]);
    }
    public function create()
    {
        $data = Company::select('id', 'company_name')->get();
        return Inertia::render('Modules/Department/Create', [
            'department' => $data,
        ]);
    }
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
    }
    public function show($id)
    {

        $data = Department::join('companies', 'companies.id', '=', 'departments.company_id')
        ->where('departments.id', $id)
        ->select(
            'departments.id',
            'departments.department_name',
            'departments.department_code',
            'departments.company_id',
            'companies.company_name as company_name'
        )
        ->firstOrFail($id);


        return Inertia::render('Modules/Department/ShowUpdateDelete', [
            'departments' => $data
        ]);
    }
    public function update(UpdateDepartmentRequest $request, Department $department)
    {
        //
    }
    public function destroy(Department $department)
    {
        //
    }
}
