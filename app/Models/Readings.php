<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Readings extends Model
{
    use HasFactory;

    protected $fillable = [
        'meter_id',
        'consumption',
        'reading',
        'reading_date',
        
    ];
}
