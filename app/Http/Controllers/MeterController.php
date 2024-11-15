<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Meter;
use Illuminate\Http\Request;
use App\Http\Requests\StoreMeterRequest;
use App\Http\Requests\UpdateMeterRequest;


class MeterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Meters', [
            'companies' => '1213',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Modules/Meters/MeterCreate');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        sleep(2);

        $fields = $request->validate([
            'department_id' => ['required'],
            'meter_name' => ['required'],
            'serial_number' => ['required']
        ]);

        Meter::create($fields);

        return redirect('/meter');
    }

    /**
     * Display the specified resource.
     */
    public function show(Meter $meter)
    {
        //
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
    public function update(UpdateMeterRequest $request, Meter $meter)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Meter $meter)
    {
        //
    }
}
