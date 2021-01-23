<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use Illuminate\Http\Request;

class TweetController extends Controller
{

    public function myTweets()
    {

        $tweets = Tweet::whereIn('user_id', [auth()->user()->id])
            ->with('user')
            ->withCount('likes')
            ->latest()
            ->get();

        return response()->json(["status" => true , "data" => ["tweets" => $tweets]]);
    }

    public function explore(){

        $users = auth()->user()->following()->get()->pluck("id");

        $tweets = Tweet::whereIn('user_id', $users)
            ->with('user')
            ->with('likes')->withCount('likes')
            ->latest()
            ->get();

        return response()->json(["status" => true , "data" => ["tweets" => $tweets]]);
    }

    public function create(Request $request)
    {
        $r = $request->user()->tweets()->create([
            'user_id' => $request->user()->id,
            'body' => $request->body
        ]);

        return response()->json(["status" => true , "message" => "Successfully Tweeted"]);
    }
    public function retweet(Request $request){
        $tweet = Tweet::find($request->tweet_id);
        if(is_null($tweet)){
            $result = ["status" => false , "message" => "Tweet Not Found!"];
        }else{
            $request->user()->tweets()->create([
                'user_id' => $request->user()->id,
                'body' => $tweet->body,
                'retweeted' => $tweet->id
            ]);

            return response()->json(["status" => true , "message" => "Successfully Retweeted"]);
        }
    }

    public function delete(Request $request)
    {
        $tweet = Tweet::find($request->tweet_id);
        if(is_null($tweet)){
            $result = ["status" => false , "message" => "Tweet Not Found!"];
        }else{
            if($tweet->user_id == auth()->user()->id){
                $tweet->delete();
                Tweet::where("retweeted" , $request->tweet_id)->delete();
                $result = ["status" => true , "message" => "Successfully Deleted"];
            }else{
                $result = ["status" => false , "message" => "You Can't Delete this tweet"];
            }

        }
        return response()->json($result);
    }

    public function likeOrNot(Request $request){
        $tweet = Tweet::find($request->tweet_id);
        if(is_null($tweet)) {
            $result = ["status" => false, "message" => "Tweet Not Found!"];
        }else{
            $likeOrNot = $tweet->likes()->toggle(auth()->user()->id);

            if(empty($likeOrNot['attached'])){
                $message = "Unliked Successfully";
            }else{
                $message = "Liked Successfully";
            }
            $result = ["status" => true, "message" => $message];
        }

        return response()->json($result);
    }

    public function getLikes(Request $request)
    {
        $likes = Tweet::find($request->tweet_id)->likes()->get();
        return response()->json(["status" => true , "data" => ["likes" => $likes]]);
    }
}
