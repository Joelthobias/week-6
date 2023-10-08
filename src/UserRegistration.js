import React, { useState } from 'react';
import {handleVerifyCode,otpGenerator,mailSender} from './verifyEmail'
import {handleSendCode,VerifyCode } from './verifyMobile'

const UserRegistrationPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [aadharNumber, setAadharNumber] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const [OTPmobile, setOTPmobile] = useState('');
    const [OTPemail, setOTPemail] = useState('');
    
    const [mobileOTP, setmobileOTP] = useState('');
    const [emailOTP, setemailOTP] = useState('');

    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isPhoneNumberVerified, setIsPhoneNumberVerified] = useState(false);

    const [eror,setError]=useState('')

    const sendEmailOtp = async() => {
        let EOTP =await otpGenerator()
        console.log("generated otp : " + EOTP);
        let sendEmail=await mailSender(email, EOTP)
        console.log(sendEmail);
        if(sendEmail){
            setOTPemail(EOTP)
        }else{
            setError(sendEmail)
        }
    };

    const handleEmailVerification=async()=>{
        let verify = handleVerifyCode(emailOTP, OTPemail)
        if(verify){
            setIsEmailVerified(1)
        }else{
            console.log(verify);
            setError(verify)
        }
    }
    const sendMobileOtp = () => {

        let sendCode=handleSendCode(phoneNumber)
        if (sendCode) {
            setOTPmobile(1)
        } else {
            setError(sendCode)
        }
    };
    const handleMobileVerification = () => {
        let status=VerifyCode(mobileOTP)
        if (status) {
            setIsPhoneNumberVerified(1)
        } else {
            setError(status)
        }
    };

    const handleRegistration = () => {
        // Perform registration logic here
    };

    return (
        <div className="m-5">
            <p id="sign-in-button"></p>
            <h1 >User Registration</h1>
            <p className="text-red">{eror}</p>
            <form className='m-5 col-4'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="input-group">
                        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {!isEmailVerified&&
                            <button className="btn btn-primary" type="button" onClick={sendEmailOtp}>Verify</button>
                        }
                    </div>
                </div>
                {OTPemail && !isEmailVerified &&
                (<div className="mb-3  ms-auto col-8 d-flex">
                    <label htmlFor="email" className="form-label m-2">OTP: </label>
                    <div className="input-group">
                        <input type="email" className="form-control" id="email" value={emailOTP} onChange={(e) => setemailOTP(e.target.value)} />
                        <button className="btn btn-primary" type="button" onClick={handleEmailVerification}>Verify</button>
                    </div>
                </div>)}
                <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <div className="input-group">
                        <input type="tel" className="form-control" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                        {!isPhoneNumberVerified &&
                            <button className="btn btn-primary" type="button" onClick={sendMobileOtp}>Verify</button>
                        }   
                    </div>
                </div>
                {OTPmobile && !isPhoneNumberVerified &&
                    (<div className="mb-3  ms-auto col-8 d-flex">
                        <label htmlFor="email" className="form-label m-2">OTP: </label>
                        <div className="input-group">
                            <input type="email" className="form-control" id="email" value={mobileOTP} onChange={(e) => setmobileOTP(e.target.value)} />
                            <button className="btn btn-primary" type="button" onClick={handleMobileVerification}>Verify</button>
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
