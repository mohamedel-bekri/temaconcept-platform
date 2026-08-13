<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    public const STATUSES = ['new', 'contacted', 'qualified', 'converted', 'recycled'];

    protected $fillable = [
        'session_uuid', 'name', 'company', 'email', 'phone', 'need',
        'budget', 'timeline', 'role', 'score', 'status', 'source',
        'escalated', 'contact_consent', 'notes',
    ];

    protected $casts = [
        'escalated' => 'boolean',
        'contact_consent' => 'boolean',
    ];

    public function chatSessions()
    {
        return $this->hasMany(ChatSession::class);
    }

    public function isHot(): bool
    {
        return $this->score >= config('chatbot.scoring.hot_threshold', 70);
    }

    public function isWarm(): bool
    {
        return $this->score >= config('chatbot.scoring.warm_threshold', 40)
            && $this->score < config('chatbot.scoring.hot_threshold', 70);
    }
}
