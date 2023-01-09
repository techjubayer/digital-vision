<?php

namespace App\Http\Controllers\Seller;

use App\CustomHelper\DataValidation;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Rules\PhoneNumberValidate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    function userSignUp(Request $request)
    {
        $responseArray = array();
        $user = new User();

        $phone = $request->input('phone');
        $email = $request->input('email');
        $name = $request->input('name');
        $password = $request->input('password');
        $cs = $request->input("cs");



        if ($phone == null) {
            $responseArray['response'] = false;
            $responseArray['message'] = 'Phone number missing, please enter phone number';
            return json_encode($responseArray);
        }
        if (!DataValidation::phoneNumberValidate($phone)) {
            $responseArray['response'] = false;
            $responseArray['message'] = 'Invalid phone number, please enter a valid phone number';
            return json_encode($responseArray);
        }

        if ($email != null) {
            if (!DataValidation::emailValidate($email)) {
                $responseArray['response'] = false;
                $responseArray['message'] = "Invalid email address, please enter valid email address";
                return json_encode($responseArray);
            }
            if ($user::where('email', '=', $email)->exists()) {
                $responseArray['response'] = false;
                $responseArray['message'] = "Email address already registered, please try another email";
                return json_encode($responseArray);
            }
        }

        if (strlen($password) < 8) {
            $responseArray['response'] = false;
            $responseArray['message'] = "Password must be 8 character length";
            return json_encode($responseArray);
        }


        // Checksum Check---------------START
        $csSK = DataValidation::genCheckSumSecreteKey();
        $puzzle = "" . $csSK;
        $genCheckSum = DataValidation::genCheckSum($puzzle);

        if ($cs != $genCheckSum && false) { //Must Delete false from here
            $responseArray['response'] = false;
            $responseArray['message'] = 'Invalid checksum';
            return json_encode($responseArray);
        }
        // Checksum Check---------------END

        $user->userId = DataValidation::userIdGen($phone);
        $user->phone = $phone;
        $user->email = $email;
        $user->password = DataValidation::hashPass($password);
        $user->name = $name;
        $user->token = DataValidation::gentoken($user->id);

        try {
            $user->save();
            $responseArray['response'] = true;
            $responseArray['user'] = $user;
        } catch (\Illuminate\Database\QueryException $e) {
            $errorCode = $e->errorInfo[1];
            if ($errorCode == '1062') {
                $responseArray['response'] = false;
                $responseArray['message'] = "Phone number already registered, please try another number";
            }
            // $responseArray['errorCode'] = $errorCode;
            // $responseArray['errorMessage'] = $e->getMessage();
        }

        return json_encode($responseArray);
    }


    function userLogin(Request $request)
    {
        $responseArray = array();

        $idPhone = $request->input('ip');
        $password = DataValidation::hashPass($request->input('password'));
        $cs = $request->input("cs");

        // Checksum Check---------------START
        $csSK = DataValidation::genCheckSumSecreteKey();
        $puzzle = $idPhone . $csSK . $password;
        $genCheckSum = DataValidation::genCheckSum($puzzle);

        if ($cs != $genCheckSum && false) { //Must Delete false from here
            $responseArray['response'] = false;
            $responseArray['message'] = 'Invalid checksum';
            return json_encode($responseArray);
        }
        // Checksum Check---------------END


        $user = User::where('phone', $idPhone)->orWhere('userId', $idPhone)->first();
        if ($user == null) {
            $responseArray['response'] = false;
            $responseArray['message'] = "User not found, please check phone or user id";
            return json_encode($responseArray);
        }

        $dbPassword = $user->password;
        if ($dbPassword != $password) {
            $responseArray['response'] = false;
            $responseArray['message'] = "Invalid password, please enter valid password";
            return json_encode($responseArray);
        }

        $user->token = DataValidation::gentoken($user->userId);
        $userUpdate = $user->save();

        if (!$userUpdate) {
            $responseArray['response'] = false;
            $responseArray['message'] = 'Something went wrong, please try again';
            return json_encode($responseArray);
        }

        $responseArray['response'] = true;
        $responseArray['user'] = $user;
        return json_encode($responseArray);
    }

    public function getUserDetails(Request $request)
    {
        $responseArray = array();
        $responseArray['response'] = true;
        $responseArray['user'] = $request['user'];
        return json_encode($responseArray);
    }

    public function updateProfile(Request $request)
    {
        $responseArray = array();

        $user = $request['user'];

        $email = $request->input('email');
        $name = $request->input('name');
        $shopName = $request->input('shopName');
        $marketName = $request->input('marketName');
        $pinCode = $request->input('pinCode');
        $address = $request->input('address');
        $state = $request->input('state');
        $country = $request->input('country');



        //Updatable Fields Checking-------------------START
        if ($email != null) {
            if (!DataValidation::emailValidate($email)) {
                $responseArray['response'] = false;
                $responseArray['message'] = "Invalid email address, please enter valid email address";
                return json_encode($responseArray);
            }
            if (!$user::where('email', '=', $email)->exists()) {
                $user->email = $email;
            }
        }
        if ($name != null) {
            $user->name = $name;
        }
        if ($shopName != null) {
            $user->shopName = $shopName;
        }
        if ($marketName != null) {
            $user->marketName = $marketName;
        }
        if ($pinCode != null) {
            $user->pinCode = $pinCode;
        }
        if ($address != null) {
            $user->address = $address;
        }
        if ($state != null) {
            $user->state = $state;
        }
        if ($country != null) {
            $user->country = $country;
        }
        //Updatable Fields Checking-------------------END

        $userUpdate = $user->save();

        if (!$userUpdate) {
            $responseArray['response'] = false;
            $responseArray['message'] = 'Something went wrong, please try again';
            return json_encode($responseArray);
        }

        $responseArray['response'] = true;
        $responseArray['user'] = $user;
        return json_encode($responseArray);
    }
}
