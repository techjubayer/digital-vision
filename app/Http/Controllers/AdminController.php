<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\RechargeHistory;
use Auth;

class AdminController extends Controller
{
    public function logout()
    {
        Auth::guard('web')->logout();
        return redirect()->route('login');
    }

    public function dashboard()
    {
        $data = RechargeHistory::whereBetween('TransDate', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->get();

        // $totalfail = $data->where('Status', 'FAILURE')->count();
        $totalfail = RechargeHistory::where('Status', 'FAILURE')->count();
        $totalsuccess = RechargeHistory::where('Status', 'SUCCESS')->count();
        $totalpending = RechargeHistory::where('Status', 'PENDING')->count();

        $today = Carbon::now()->format('d-m-y');
        $thismonth = Carbon::now()->format('m');


        return view('admin.index', compact('totalfail', 'totalsuccess', 'totalpending', 'data', 'thismonth'));
    } //end of Dashboard

    public function rechargeHistory(Request $request)
    {
        $start = Carbon::parse($request->input('start'));
        $end = Carbon::parse($request->input('end'))->endOfDay();

        // return json_encode([
        //     "start" => $start,
        //     "end" => $end
        // ]);
        

        if ($start != "" && $end != "") {
            $data = RechargeHistory::whereBetween('TransDate', [$start, $end])->get();
        } else {
            $start = Carbon::now()->startOfMonth();
            $end = Carbon::today();

            $data = RechargeHistory::whereBetween('TransDate', [$start, $end])->get();
        }
        $start = $start->toDateString();
        $end = $end->toDateString();


        $totalfail = $data->where('Status', 'FAILURE'||'failure'||'Failure'||'Fail'||'fail'||'FAIL')->count();
        $totalsuccess = $data->where('Status', 'Success'||'SUCCESS'||'success')->count();
        $totalpending = $data->where('Status', 'PENDING')->count();
        $totalsell = $data->where('Status', 'Success'||'SUCCESS'||'success')->sum('amount');

        return view('admin.recharge', compact('data', 'start', 'end', 'totalfail', 'totalsuccess', 'totalpending', 'totalsell'));
    }
}
