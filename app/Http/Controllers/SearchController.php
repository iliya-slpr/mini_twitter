<?php

namespace App\Http\Controllers;

use App\Models\Tweet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $q = $request->q;
        $res = ["status" => true , "data" => []];
        if(Str::startsWith($q , '#')){
            $res['data']['search_type'] = "hashtag";
            $res['data']['tweets'] = Tweet::where('body' ,'like' , '%' . $q .'%')->with('user')->get();
        }else if(Str::startsWith($q , '@')){
            $res['data']['search_type'] = "user";
            $res['data']['users'] = User::where('name', 'like' , '%' . Str::substr($q,1) .'%')->get();
        }else{
            $res['data']['search_type'] = "tweet";
            $res['data']['tweets'] = Tweet::where('body' ,'like' , '%' . $q .'%')->with('user')->get();
        }
        return response()->json($res);
    }
}
