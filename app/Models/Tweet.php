<?php

namespace App\Models;

use DateTimeInterface;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'body',
    ];

    protected $hidden = [
      'updated_at'
    ];

    protected $appends = ['am_i_liked'];

    public function likes()
    {
        return $this->belongsToMany(User::class , "tweet_like","tweet_id" );
    }
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getAmILikedAttribute()
    {
        return $this->likes()->get()->contains("id" ,"==",auth()->user()->id );
    }

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
