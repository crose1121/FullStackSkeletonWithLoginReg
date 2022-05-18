import React from 'react';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';

const SignIn = () => {
    return (
        <div>
            <h1>Register or Log In Below</h1>

            <div className="row">
                <div className="col">
                    <RegistrationForm></RegistrationForm>
                </div>
                <div className="col">
                    <LoginForm></LoginForm>
                </div>
            </div>

            

        </div>
    );
};

export default SignIn;