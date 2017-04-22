<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    
    public function __construct()
    {
        
    }

    public function login(Request $request)
    {
        $input = $request->all();
        $username = $input['username'];
        $plain_password = $input['password'];
        $user = User::where('username', $username)->first();

        if ( empty($user) ) {
            $result = array(
                'result' => false,
                'message' => 'No user found'
            );
            return response($result);
        }

        $user_pass = $user->password;
        if (Hash::check($plain_password, $user_pass)) {
            $result = array(
                'result' => true,
                'user' => $user
            );
        } else {
            $result = array(
                'result' => false,
                'message' => 'Password incorrect'
            );
        }

        return response($result);
    }
}
