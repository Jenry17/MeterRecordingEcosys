<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Department;
use App\Models\Company;
use Illuminate\Http\Request;

class DepartmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->get('search', '');

        $data = Department::select(
            'departments.id',
            'departments.department_name',
            'departments.department_code',
            'departments.company_id',
            'companies.company_name as company_name'
        )
            ->join('companies', 'companies.id', '=', 'departments.company_id')
            ->when($search, function ($query) use ($search) {
                $query->where('departments.department_name', 'like', "%$search%")
                    ->orWhere('companies.company_name', 'like', "%$search%");
            })
            ->paginate(10);

        return Inertia::render('Department', ['department' => $data, 'search' => $search]);
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

        $companies  = Company::select('id', 'company_name')->get();

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
            'departments' => $data,
            'company' => $companies,
        ]);
    }
    public function update(Request $request, $id)
    {
        $data = Department::findOrFail($id);
        $validated = $request->validate(rules: [
            'department_name' => 'required|string|max:255',
            'department_code' => 'required|string|max:255',
            'company_id' => 'required|integer|max:255',

        ]);
        $data->update($validated);

        return redirect('/department');
    }
    public function destroy($id)
    {
        $data = Department::findOrFail($id);
        $data->delete();
        return redirect('/department');
    }
}
