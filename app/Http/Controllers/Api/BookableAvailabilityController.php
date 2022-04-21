<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Bookable;
use Illuminate\Http\Request;

class BookableAvailabilityController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke($id, Request $request)
    {
        $data = $request->validate([
            'from' => 'required|date|after:now',
            'to' => 'required|date|after:from',
        ]);

        return Bookable::findOrFail($id)->availableFor($data['from'], $data['to']) ?
            response(['id' => $id, 'available' => true]):
            response(['id' => $id, 'available' => false], 404);
    }
}
