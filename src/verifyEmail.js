import emailjs from '@emailjs/browser';


const otpGenerator = async () => {
    var digits = '0123456789';
    let otpcode = '';
    for (let i = 0; i < 6; i++) {
        otpcode += digits[Math.floor(Math.random() * 10)];
    }
    console.log("generated otp" + otpcode);
    return otpcode;
}

const mailSender = async (email, otp) => {
    try {
        if (email && otp) {
            emailjs.send('service_w46k1lc', 'template_skou5y3', {
                otp, email
            }, 'pUJ7ft0r44dYAzVEc')
                .then((result) => {
                    console.log(result.text);
                    return 1
                }, (error) => {
                    console.log(error);
                    return 0
                });
        } else {
            console.log('OTP : ' + otp);
            console.log('email : ' + email);

        }
    } catch (error) {
        console.log("err : ", error.message);
    }
};


const handleVerifyCode = async (verificationCode, otp) => {
    // otp is send and verificationCode is recived
    try {
        if (verificationCode === otp) {
            setSucess("Email verification Completed");
            console.log(sucess);
        } else {
            console.log(otp + ' : ' + verificationCode);
            setVerificationError("Invalid OTP");
        }
    } catch (error) {
        console.error('Error verifying code:', error);
        setVerificationError(error);
    }
};
export { otpGenerator, handleVerifyCode, mailSender };
export default mailSender;