<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bookable>
 */
class BookableFactory extends Factory
{

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $suffix = [
            'Villas',
            'House',
            'Flat',
            'Cottage',
            'Luxury Villas',
            'Motel',
            'Hotel',
            'Camping'
        ];
        
        return [
            'title' => $this->faker->city() .' '. Arr::random($suffix),
            'description' => $this->faker->paragraph(15),
            'price' => $this->faker->numberBetween(0, 3000),
        ];
    }
}
