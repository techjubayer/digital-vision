<?php

namespace App\Http\Middleware\MyMiddleware;

use Closure;
use Illuminate\Http\Request;

class XssSanitization
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
        $input = $request->all();
        array_walk_recursive($input, function (&$input) {
            $input = str_replace('1"or"1"="', '', $input);
            $input = str_replace("1'or'1'='", '', $input);
            $input = str_replace("1=", '', $input);
            $input = str_replace("=1", '', $input);
            $input = str_replace('%', '', $input);
            $input = str_replace('#', '', $input);
            $input = str_replace("'", '', $input);
            $input = str_replace('"', '', $input);
            $input = str_replace('`', '', $input);
            $input = str_replace('//', '', $input);
            $input = str_replace('\\', '', $input);
            $input = str_replace('||', '', $input);
            $input = str_replace(';', '', $input);
            $input = str_replace('(', '', $input);
            $input = str_replace(')', '', $input);
            $input = str_replace('=', '', $input);
            $input = str_replace('&', '', $input);
            $input = strip_tags($input);
            $input = stripslashes($input);
            $input = htmlspecialchars($input);
            $input = trim(preg_replace('/\s+/', ' ', $input));
        });
        $request->merge($input);
        return $next($request);
    }
}
