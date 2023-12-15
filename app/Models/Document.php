<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    use HasFactory;
    protected $fillable = [
        "title",
        "is_folder",
        "content",
        "is_published",
        'document_id',
        "icon",
        "user_id"
    ];

    protected $appends = [
        'author',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function documents()
    {
        return $this->belongsTo(Document::class, 'document_id');
    }

    public function getAuthorAttribute(): string
    {
        return $this->user->name;
    }
}
