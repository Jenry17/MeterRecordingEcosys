<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCompanyRequest;
use App\Http\Requests\UpdateCompanyRequest;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $companyData = Company::select('id','company_name','company_code')->paginate(5);
        return Inertia::render('Company', [
            'companies' => $companyData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Modules/Company/CreateEdit');
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
    public function show(Company $company)
    {
        //
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
    public function update(UpdateCompanyRequest $request, Company $company)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Company $company)
    {
        //
    }
}
