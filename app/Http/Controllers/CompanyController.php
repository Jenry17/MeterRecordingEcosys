<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyRequest;
use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companyData = Company::select('id', 'company_name', 'company_code')->paginate(5);
        return Inertia::render('Company', [
            'companies' => $companyData,
        ]);
    }
    public function create()
    {
        return Inertia::render('Modules/Company/Create');
    }
    public function store(Request $request)
    {
        sleep(2);

        $fields = $request->validate([
            'company_name' => ['required'],
            'company_code' => ['required']
        ]);

        Company::create($fields);
        return redirect('/company');
    }
    public function show($id)
    {
        $company = Company::findOrFail($id);
        return Inertia::render('Modules/Company/ShowUpdateDelete', [
            'companies' => $company
        ]);

    }
    public function update(Request $request, $id)
    {
        $data = Company::findOrFail($id);
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_code' => 'required|string|max:255',
        ]);
        $data->update($validated);

        return redirect('/company');
    }

    public function destroy($id)
    {
        $data = Company::findOrFail($id);
        $data->delete();
        return redirect('/company');
    }
}
