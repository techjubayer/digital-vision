@extends('admin.admin_master')
@section('content')



<div class="page-content">
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0">Recharge Hystory</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item"><a href="{{route('dashboard')}}">{{ __('Admin') }}</a></li>
                            <li class="breadcrumb-item active">Recharge Hystory</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
        <!-- end page title -->

        <div class="row">
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1">
                                <h1 class="text-truncate font-size-14 mb-2" style="font-size: 20px; font-weight: 900;">
                                    Total Sales</h1>
                                <h4 class="mb-2">{{$totalCurrentSell}}</h4>

                                @if($growthRate > 0)
                                <p class="text-muted mb-0"><span class="text-success fw-bold font-size-12 me-2"><i class="ri-arrow-right-up-line me-1 align-middle"></i>{{round(abs($growthRate), 2)}}%</span>previous period</p>
                                @else
                                <p class="text-muted mb-0"><span class="text-danger fw-bold font-size-12 me-2"><i class="ri-arrow-right-down-line me-1 align-middle"></i>{{round(abs($growthRate), 2)}}%</span>previous period</p>
                                @endif
                            </div>
                            <div class="avatar-sm">
                                <span class="avatar-title bg-light text-primary rounded-3">
                                    <i class="ri-shopping-cart-2-line font-size-24"></i>
                                </span>
                            </div>
                        </div>
                    </div><!-- end cardbody -->
                </div><!-- end card -->
            </div><!-- end col -->
            <div class="col-xl-3 col-md-6">
                <div class="card ">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1">
                                <h1 class="text-truncate font-size-14 mb-2" style="font-size: 20px; font-weight: 900;">
                                    Success</h1>
                                <h4 class="mb-2">{{ $totalCurrentSuccess }}</h4>
                                @if($successGrowthRate > 0)
                                <p class="text-muted mb-0"><span class="text-success fw-bold font-size-12 me-2"><i class="ri-arrow-right-up-line me-1 align-middle"></i>{{round(abs($successGrowthRate), 2)}}%</span>previous period</p>
                                @else
                                <p class="text-muted mb-0"><span class="text-danger fw-bold font-size-12 me-2"><i class="ri-arrow-right-down-line me-1 align-middle"></i>{{round(abs($successGrowthRate), 2)}}%</span>previous period</p>
                                @endif
                            </div>
                            <div class="avatar-sm">
                                <span class="avatar-title bg-light text-success rounded-3">
                                    <i class="mdi mdi-currency-usd font-size-24"></i>
                                </span>
                            </div>
                        </div>
                    </div><!-- end cardbody -->
                </div><!-- end card -->
            </div><!-- end col -->
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1">
                                <h1 class="text-truncate font-size-14 mb-2" style="font-size: 20px; font-weight: 900;">
                                    Pending</h1>
                                <h4 class="mb-2">{{ $totalCurrentPending }}</h4>
                                @if($pendingRate > 0)
                                <p class="text-muted mb-0"><span class="text-success fw-bold font-size-12 me-2"><i class="ri-arrow-right-up-line me-1 align-middle"></i>{{round(abs($pendingRate), 2)}}%</span>previous period</p>
                                @else
                                <p class="text-muted mb-0"><span class="text-danger fw-bold font-size-12 me-2"><i class="ri-arrow-right-down-line me-1 align-middle"></i>{{round(abs($pendingRate), 2)}}%</span>previous period</p>
                                @endif
                            </div>
                            <div class="avatar-sm">
                                <span class="avatar-title bg-light text-primary rounded-3">
                                    <i class="ri-user-3-line font-size-24"></i>
                                </span>
                            </div>
                        </div>
                    </div><!-- end cardbody -->
                </div><!-- end card -->
            </div><!-- end col -->
            <div class="col-xl-3 col-md-6">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex">
                            <div class="flex-grow-1">
                                <h1 class="text-truncate font-size-14 mb-2" style="font-size: 20px; font-weight: 900;">
                                    Failure</h1>
                                <h4 class="mb-2">{{ $totalCurrentFail }}</h4>
                                @if($failRate > 0)
                                <p class="text-muted mb-0"><span class="text-success fw-bold font-size-12 me-2"><i class="ri-arrow-right-up-line me-1 align-middle"></i>{{round(abs($failRate), 2)}}%</span>previous period</p>
                                @else
                                <p class="text-muted mb-0"><span class="text-danger fw-bold font-size-12 me-2"><i class="ri-arrow-right-down-line me-1 align-middle"></i>{{round(abs($failRate), 2)}}%</span>previous period</p>
                                @endif
                            </div>
                            <div class="avatar-sm">
                                <span class="avatar-title bg-light text-success rounded-3">
                                    <i class="mdi mdi-currency-btc font-size-24"></i>
                                </span>
                            </div>
                        </div>
                    </div><!-- end cardbody -->
                </div><!-- end card -->
            </div><!-- end col -->
        </div>

        <div class="card">
            <div class="card-body">

                <h4 class="card-title">Search Engine</h4>
                <p class="card-title-desc">Search Like detectiev without hesitation . </p>

                <div class="row">

                    <form action="{{ route('rechargeHistory') }}" method="GET">
                        <div>
                            <label class="form-label">Date Range</label>

                            <div class="input-daterange input-group" id="datepicker6" data-date-format="dd M, yyyy" data-date-autoclose="true" data-provide="datepicker" data-date-container='#datepicker6'>
                                <input type="date" class="form-control" name="start" placeholder="Start Date" value="{{$start}}" />
                                <input type="date" class="form-control" name="end" placeholder="End Date" value="{{$end}}" />
                            </div>
                        </div>
                        <div class="form-group mb-3 text-center row mt-3 pt-1">
                            <div class="col-12">
                                <input class="btn btn-info w-100 waves-effect waves-light" type="submit" value="submit">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <!-- Table -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <table id="datatable" class="table table-bordered dt-responsive nowrap" style="border-collapse: collapse; border-spacing: 0; width: 100%;">
                            <thead>
                                <tr>
                                    <th>Sl No.</th>
                                    <th>Number</th>
                                    <th>Operator</th>
                                    <th>Amount</th>
                                    <th>Transection Id</th>
                                    <th>API Provider</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th class="hide">User Number</th>
                                </tr>
                            </thead>


                            <tbody>
                                @foreach ($currentData as $key => $user)
                                <tr>
                                    <td>{{ $key++ }}</td>
                                    <td>{{ $user->number }}</td>
                                    <td>{{ $user->operator }}</td>
                                    <td>{{ $user->amount }}</td>
                                    <td>{{ $user->txnId }}</td>
                                    <td>{{ $user->rc_from }}</td>
                                    <td>{{ $user->TransDate }}</td>
                                    <td>
                                        @if ($user->Status === 'SUCCESS' || $user->Status === 'Success' || $user->Status === 'success')
                                        <div class="font-size-13"><i class="ri-checkbox-blank-circle-fill font-size-10 text-success align-middle me-2"></i>Success
                                        </div>
                                        @elseif ($user->Status === 'Pending' || $user->Status === 'PENDING' || $user->Status === 'pending')
                                        <div class="font-size-13"><i class="ri-checkbox-blank-circle-fill font-size-10 text-warning align-middle me-2"></i>Pending
                                        </div>
                                        @else
                                        <div class="font-size-13"><i class="ri-checkbox-blank-circle-fill font-size-10 text-danger align-middle me-2"></i>Failed
                                        </div>
                                        @endif

                                    </td>
                                    <td>{{ $user->user_phone }}</td>
                                </tr>
                                @endforeach

                            </tbody>
                        </table>

                    </div>
                </div>
            </div> <!-- end col -->
        </div> <!-- end row -->



    </div>
</div>
@endsection
<script src="{{ asset('backend/assets/libs/bootstrap-datepicker/js/bootstrap-datepicker.min.js')}"></script>