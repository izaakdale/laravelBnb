<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReviewResource;
use App\Models\Booking;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function show($id)
    {
        return new ReviewResource(Review::findOrFail($id));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'id' => 'required|size:36',
            'content' => 'required|min:2',
            'rating' => 'required|in:0,1,2,3,4,5',
        ]);

        if(isset($data['errors']))
        {
            abort(422, 'Invalid data sent');
        }
        
        $booking = Booking::findByReviewKey($data['id']);

        if(!$booking){
            return abort(404);
        }

        $booking->review_key = '';
        $booking->save();

        $review = Review::make($data);
        $review->booking_id = $booking->id;
        $review->bookable_id = $booking->bookable->id;
        $review->save();

        return new ReviewResource($review);
    }
}
