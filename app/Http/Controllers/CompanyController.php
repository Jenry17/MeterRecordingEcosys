<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Requests\UpdateCompanyRequest;

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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Modules/Company/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show($id)
    {

        // Fetch the post from the database by its ID
        $company = Company::findOrFail($id);

        // Return the post data to the Inertia page
        return Inertia::render('Modules/Company/ShowUpdateDelete', [
            'companies' => $company
        ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Company $company)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // dd($request);
        $data = Company::findOrFail($id);
        $validated = $request->validate([
            'company_name' => 'required|string|max:255',
            'company_code' => 'required|string|max:255',
        ]);
        $data->update($validated);

        return redirect('/company');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $data = Company::findOrFail($id);
        $data->delete();

        return redirect('/company');
    }
}
