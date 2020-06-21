import React from 'react';

const SignUpAlert = ({type, msg}) => {
    return (
        <p className={`sign-up-alert ${type}`}>{msg}</p>
    );
}

export default SignUpAlert;