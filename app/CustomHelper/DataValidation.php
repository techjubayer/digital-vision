<?php

namespace App\CustomHelper;

// date_default_timezone_set('Asia/Kolkata');
class DataValidation
{


    public static function test($string)
    {
        return crc32($string);
    }


    //user email validation
    public static function emailValidate($email)
    {
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    //user phone number validation
    public static function phoneNumberValidate($phone)
    {
        return preg_match('/^[0-9]{10}+$/', $phone);
    }

    //Login token generator
    public static function gentoken($userId)
    {
        $randNum = rand(1000, 999999999999999) . round(microtime(true) * 1000) . $userId . rand(1000, 999999999999999);
        return hash('sha256', $randNum);
    }


    //Login token generator
    public static function genProductKey()
    {
        return round(microtime(true) * 1000) . rand(0, 9999);
    }
    //Secrete Key where we find min rs price, cost and ws price
    public static function genProductCode($productCost, $ws_price)
    {
        $code1 = round(($productCost + round(abs(($ws_price - $productCost) * 2))) * 2);
        $code2 = round(abs($productCost));
        $code3 = round(abs($ws_price * 3));
        return strlen($code1) . $code1 . '2' . $code2 . $code3 . strlen($code3);
    }

    //user id genrate
    public static function userIdGen($phone)
    {
        return hash('crc32', $phone);
    }


    //Generate checksum from puzzle
    public static function genCheckSum($puzzle)
    {
        return hash('sha384', $puzzle);
    }

    //Generate checksum from puzzle
    public static function genCheckSumSecreteKey()
    {
        $round = round(microtime(true) * 1000);
        $round = str_replace(substr($round, -5), "00000", $round);
        return $round + 2548709853841;
    }



    //password hashing alogo
    public static function hashPass($pass)
    {
        $md5 = hash('md5', $pass);
        $sha256 = hash('sha256', $md5);
        $ripemd256 = hash('ripemd256', $sha256);
        return hash('gost', $ripemd256);
    }


    //Login password for fontend
    public static function genFontendPass($plan_pass)
    {
        return hash('md5', $plan_pass);
    }

    //Get time difference
    public static function getdateTimeDiff($thatTime)
    {
        $currentTime = strtotime(date("Y-m-d H:i:s"));
        $timeDiff = $currentTime - strtotime($thatTime);

        $days = 0;
        $hours = 0;
        $minuts = 0;
        $seconds = 0;

        if ($timeDiff < 60) {
            $seconds = $timeDiff;
            return $seconds <= 1 ? $seconds . ' second ago' : $seconds . ' seconds ago';
        } elseif ($timeDiff >= 60 && $timeDiff < 3600) {
            $minuts = round($timeDiff / 60);
            $seconds = round($timeDiff % 60);
            return $minuts . 'min ' . $seconds . 'sec ago';
        } elseif ($timeDiff >= (3600) && $timeDiff < 86400) {
            $hours = round($timeDiff / 3600);
            $minuts = round(($timeDiff % 3600) / 60);
            $seconds = round(($timeDiff % 3600) % 60);
            return $hours . 'h ' . $minuts . 'm ' . $seconds . 's ago';
        } else {
            $days = round($timeDiff / 86400);
            $hours = round(($timeDiff % 86400) / 3600);
            $minuts = round((($timeDiff % 86400) % 3600) / 60);
            $seconds = round((($timeDiff % 86400) % 3600) % 60);
            return $days . 'd ' . $hours . 'h ' . $minuts . 'm ' . $seconds . 's ago';
        }
    }
}
