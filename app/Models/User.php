<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = ['am_i_followed'];

    public function following()
    {
        return $this->belongsToMany(User::class,"user_follow","user_id","followed_user_id");
    }

    public function followers()
    {
        return $this->belongsToMany(User::class,"user_follow","followed_user_id");
    }

    public function likes()
    {
        return $this->hasMany(User::class);
    }

    public function tweets()
    {
        return $this->hasMany(Tweet::class);
    }

    public function getAmIFollowedAttribute()
    {
        return $this->followers()->get()->contains("id" ,"==",auth()->user()->id);
    }

}
