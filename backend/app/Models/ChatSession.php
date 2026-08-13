<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'session_uuid', 'lead_id', 'status',
        'message_count', 'asked_human',
    ];

    protected $casts = [
        'asked_human' => 'boolean',
    ];

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function lead()
    {
        return $this->belongsTo(Lead::class);
    }
}
