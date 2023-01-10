<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RechargeHistory extends Model
{
    use HasFactory;
    protected $table = "recharge_history";
    protected $primaryKey = "txnId";
    const CREATED_AT = 'TransDate';
    const UPDATED_AT = 'UPDATED_AT';
}
