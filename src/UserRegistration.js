import React, { useState } from 'react';
import {handleVerifyCode,otpGenerator,mailSender} from './verifyEmail'


const UserRegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [mobileOTP, setmobileOTP] = useState('');
    const [emailOTP, setemailOTP] = useState('');
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);
    let otpEmail;
    const handleEmailVerification = async() => {
       otpEmail=otpGenerator()
       await mailSender(email,otpEmail)
    };

    const handlePhoneNumberVerification = () => {
        // Generate and send OTP to the provided phone number
        // Once the OTP is verified, set isPhoneNumberVerified to true
    };

    const handleRegistration = () => {
        // Perform registration logic here
    };

    return (
        <div className="m-5">
            <h1>User Registration</h1>
            <form className='m-5 col-4'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className="btn btn-primary" type="button" onClick={handleEmailVerification}>Verify</button>
                    </div>
                </div>
                {otpEmail &&
                (<div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className="btn btn-primary" type="button" onClick={handleEmailVerification}>Verify</button>
                    </div>
                </div>)}
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <div className="input-group">
                        <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        <button className="btn btn-primary" type="button" onClick={handlePhoneNumberVerification}>Verify</button>
                    </div>
                </div>
                {mobileOTP &&
                
                (<div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button className="btn btn-primary" type="button" onClick={handleEmailVerification}>Verify</button>
                    </div>
                </div>)}
                <div className="mb-3">
                    <label htmlFor="aadharNumber" className="form-label">Aadhar Number</label>
                    <input type="text" className="form-control" id="aadharNumber" value={aadharNumber} onChange={(e) => setAadharNumber(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>
                {isEmailVerified && isPhoneNumberVerified &&  
                (<button type="button" className="btn btn-primary" onClick={handleRegistration}>Register</button>)}
            </form>
        </div>
    );
};

export default UserRegistrationPage;
