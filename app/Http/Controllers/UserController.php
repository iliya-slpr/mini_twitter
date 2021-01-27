<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = User::where('id',$request->user_id)
            ->withCount('following')
            ->withCount('followers')
            ->first();

        $user->tweets = $user->tweets()->withCount('likes')->latest()->get();

        if(is_null($user)){
            $result = ["status" => false , "message" => "User Not Found!"];
        }else{
            $result = ["status" => true , "data" => ["user" => $user]];
        }
        return response()->json($result);
    }

    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['string', 'max:255', 'unique:users']
        ]);
        if ($validator->fails()) {
            return response()->json(["status" => false , "message" => "edit failed" ,"data" => $validator->errors()->get("name")]);
        }
        $user = User::find(auth()->user()->id);
        $user->name = $request->name;
        $user->save();

        return response()->json(["status" => true , "message" => "Successfully edited"]);
    }

    public function followOrNot(Request $request){
        $user = User::find($request->user_id);
        if(is_null($user)) {
            $result = ["status" => false, "message" => "User Not Found!"];
        }else{
            $followOrNot = auth()->user()->following()->toggle($user->id);

            if(empty($followOrNot['attached'])){
                $message = "Unfollowed Successfully";
            }else{
                $message = "Followed Successfully";
            }
            $result = ["status" => true, "message" => $message];
        }

        return response()->json($result);
    }
    public function getRecentActivities()
    {
        $activities = collect([]);

        //follows
        $u = DB::table('user_follow')->where('followed_user_id' , auth('api')->user()->id)->get();;
        foreach ($u as $item)
            $activities->push(["type"=>"follow" , "user_id" => $item->user_id , "date_time" => $item->created_at]);

        //likes
        $tweetIds = auth('api')->user()->tweets()->pluck('id');
        $l = DB::table('tweet_like')->whereIn('tweet_id' , $tweetIds)->get();
        foreach ($l as $item)
            $activities->push(["type"=>"like" , "user_id" => $item->user_id , "tweet_id" => $item->tweet_id , "date_time" => $item->created_at]);

        //retweets:
        $r = DB::table('tweets')->whereIn('retweeted' , $tweetIds)->get();
        foreach ($r as $item)
            $activities->push(["type"=>"retweet" , "user_id" => $item->user_id ,"tweet_id" => $item->retweeted, "date_time" => $item->created_at]);

        $sorted = $activities->sortByDesc('date_time');
        return response()->json(["status" => true , "data" => ["recent_activities" =>$sorted->values()->all()]]);
    }
}
