<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tweet extends Model
{
    use HasFactory;

    public function likes()
    {
        return $this->belongsToMany(User::class , "tweet_like","tweet_id" );
    }
    public function user(){
        return $this->belongsTo(User::class);
    }

}