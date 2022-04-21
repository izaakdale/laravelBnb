<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookable extends Model
{
    use HasFactory;

    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    protected $fillable = [
        'title',
        'description',
        'price'
    ];

    public function availableFor($from, $to) : bool
    {
        // returns true if count is 0
        return 0 === $this->bookings()->betweenDates($from, $to)->count();
    }
}
