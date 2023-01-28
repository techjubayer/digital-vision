<?php

namespace App\Actions\Fortify;

use App\CustomHelper\DataValidation;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Laravel\Jetstream\Jetstream;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:30'],
            'phone' => ['required', 'string', 'regex:/^[0-9]{10}+$/', 'max:13', 'unique:users'],
            'email' => ['required', 'string', 'email', 'max:40', 'unique:users'],
            'password' => $this->passwordRules(),
            'terms' => Jetstream::hasTermsAndPrivacyPolicyFeature() ? ['accepted', 'required'] : '',
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'phone' => $input['phone'],
            'userId' => DataValidation::genUserId($input['phone']),
            'email' => $input['email'],
            // 'password' => Hash::make($input['password']),
            'password' => DataValidation::genHashPass($input['password']),
        ]);
    }
}
