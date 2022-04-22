<?php

namespace Database\Factories;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Review>
 */
class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'rating' => random_int(1,5),
            'id' => Str::uuid(),
            'content' => $this->faker->paragraph(5, true),
            'created_at' => Carbon::instance($this->faker->dateTimeBetween('-1year', 'now')),
        ];
    }
}
