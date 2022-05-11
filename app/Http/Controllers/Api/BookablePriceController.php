<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookable;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BookablePriceController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id, Request $request)
    {
        $bookable = Bookable::findOrFail($id);

        $data = $request->validate([
            'from' => 'required|date:format:Y-m-d',
            'to' => 'required|date:format:Y-m-d|after-or-equal:from',
        ]);

        $days = (new Carbon($data['from']))->diffInDays(new Carbon($data['to']));
        $price = $days * $bookable->price;

        return response()->json([
            'data' => [
                'total' => $price,
                'breakdown' => [
                    'num_days' => $days,
                    'price_per_day' => $bookable->price,
                ]
            ]
        ]);
    }
}
