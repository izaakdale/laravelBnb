<?php

namespace App\Models;

use Carbon\Carbon;
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

    public function priceFor($from, $to) : array
    {
        $days = (new Carbon($from))->diffInDays(new Carbon($to));
        $price = $days * $this->price;
        
        return [
                'total' => $price,
                'breakdown' => [
                    'num_days' => $days,
                    'price_per_day' => $this->price,
                ]
        ];
    }
}
