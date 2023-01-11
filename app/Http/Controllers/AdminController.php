<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Models\RechargeHistory;
// use Auth;
use Illuminate\Support\Facades\Auth;

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
        $start = $request->input('start');
        $end = $request->input('end');

        if ($start != "" && $end != "") {
            $start = Carbon::parse($start);
            $end = Carbon::parse($end)->endOfDay();
        } else {
            $start = Carbon::now()->firstOfMonth();
            $end = Carbon::today();
        }

        $daysCount = $start->diffInDays($end) + 1;
        $preDate = Carbon::parse($start)->subDays($daysCount);

        $data = RechargeHistory::whereBetween('TransDate', [$preDate, $end])->get();

        $oldData = $data->where('TransDate', '<=', $start);
        $currentData = $data->where('TransDate', '>=', $start);

        $start = $start->toDateString();
        $end = $end->toDateString();
        $preDate = $preDate->toDateString();

        // $totalSell = $data->whereIn('Status', ['Success' , 'SUCCESS' , 'success'])->sum('amount');
        $totalCurrentSell = $currentData->whereIn('Status', ['Success', 'SUCCESS', 'success'])->sum('amount');
        $totalOldSell = $oldData->whereIn('Status', ['Success', 'SUCCESS', 'success'])->sum('amount');
        $growthRate = $totalOldSell > 0 ? (($totalCurrentSell - $totalOldSell) / $totalOldSell) * 100 : 0;

        // $totalSuccess = $data->whereIn('Status', ['Success' , 'SUCCESS' , 'success'])->count();
        $totalCurrentSuccess = $currentData->whereIn('Status', ['Success', 'SUCCESS', 'success'])->count();
        $totalOldSuccess = $oldData->whereIn('Status', ['Success', 'SUCCESS', 'success'])->count();
        $successGrowthRate = $totalOldSuccess > 0 ? (($totalCurrentSuccess - $totalOldSuccess) / $totalOldSuccess) : 0;

        // $totalFail = $data->whereIn('Status', ['FAILURE' , 'failure' , 'Failure' , 'Fail' , 'fail' , 'FAIL'])->count();
        $totalCurrentFail = $currentData->whereIn('Status', ['FAILURE', 'failure', 'Failure', 'Fail', 'fail', 'FAIL'])->count();
        $totalOldFail = $oldData->whereIn('Status', ['FAILURE', 'failure', 'Failure', 'Fail', 'fail', 'FAIL'])->count();
        $failRate = $totalOldFail > 0 ? (($totalCurrentFail - $totalOldFail) / $totalOldFail) * 100 : 0;


        // $totalPending = $data->whereIn('Status', ['PENDING' , 'pending' , 'Pending'])->count();
        $totalCurrentPending = $currentData->whereIn('Status', ['PENDING', 'pending', 'Pending'])->count();
        $totalOldPending = $oldData->whereIn('Status', ['PENDING', 'pending', 'Pending'])->count();
        $pendingRate = $totalOldPending > 0 ? (($totalCurrentPending - $totalOldPending) / $totalOldPending) * 100 : 0;


        return view('admin.recharge', compact('data', 'currentData', 'oldData', 'start', 'end', 'totalCurrentSuccess', 'successGrowthRate', 'totalCurrentSell', 'growthRate', 'totalCurrentFail', 'failRate', 'totalCurrentPending', 'pendingRate'));
    }
}
