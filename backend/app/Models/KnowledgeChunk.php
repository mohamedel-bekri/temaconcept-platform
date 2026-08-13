<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KnowledgeChunk extends Model
{
    use HasFactory;

    protected $fillable = ['slug', 'title', 'source', 'content', 'embedding', 'active'];

    protected $casts = [
        'embedding' => 'array',
        'active' => 'boolean',
    ];

    public function getEmbeddingVector(): array
    {
        return $this->embedding ?? [];
    }
}
