<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BookableIndexResource;
use App\Http\Resources\BookableShowResource;
use App\Models\Bookable;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class BookableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return BookableIndexResource::collection(
            Bookable::all()
        );
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bookable  $bookable
     * @return \Illuminate\Http\Response
     */
    public function show(Bookable $bookable)
    {
        return new BookableShowResource(Bookable::findOrFail($bookable->id));
    }
}
