<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUser(Request $request)
    {
        $user = User::where('id',$request->user_id)
            ->withCount('following')
            ->withCount('followers')
            ->first();

        $user->tweets = $user->tweets()->latest()->get();

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

}
