<?php

namespace App\Http\Middleware\MyMiddleware;

use App\CustomHelper\DataValidation;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class UserLoginCheck
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $responseArray = array();


        $phone = $request->input('phone');
        $userId = $request->input('userId');
        $token = $request->input('token');
        $user = User::where('phone', $phone)->orWhere('userId', $userId)->first();
        if ($user == null) {
            $responseArray['response'] = false;
            $responseArray['message'] = "Authentication fail";

            return response($responseArray, 403);
        }

        $dbToken = $user->token;
        if ($dbToken != $token) {
            $responseArray['response'] = false;
            $responseArray['message'] = "Authentication fail";

            return response($responseArray, 403);
        }
        $request['user'] = $user;
        return $next($request);
    }
}
