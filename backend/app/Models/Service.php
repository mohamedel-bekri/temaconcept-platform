<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'code', 'name', 'slug', 'tagline', 'description',
        'bullets', 'icon', 'image_url', 'order', 'active',
    ];

    protected $casts = [
        'bullets' => 'array',
        'active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('active', true);
    }
}
