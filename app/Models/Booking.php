<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    public function bookable()
    {
        return $this->belongsTo(Booking::class);
    }

    public function review()
    {
        return $this->hasOne(Review::class);
    }

    protected $fillable = [
        'from',
        'to'
    ];
    
    public function scopeBetweenDates(Builder $query, $from, $to)
    {
        return $query->where('to', '>=', $from)->where('from', '<=', $to);
    }
}
