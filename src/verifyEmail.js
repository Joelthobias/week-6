import emailjs from '@emailjs/browser';


const otpGenerator = async () => {
    var digits = '0123456789';
    let otpcode = '';
    for (let i = 0; i < 6; i++) {
        otpcode += digits[Math.floor(Math.random() * 10)];
    }
    return otpcode;
}

const mailSender = async (email, otp) => {
    try {
        if (email && otp) {
            const result = await emailjs.send('service_w46k1lc', 'template_skou5y3', {
                otp, email
            }, 'pUJ7ft0r44dYAzVEc');
            console.log(result.text);
            return 1;
        } else {
            console.log('OTP : ' + otp);
            console.log('email : ' + email);
            return 'error';
        }
    } catch (error) {
        console.log("err : ", error.message);
        return error;
    }
};



const handleVerifyCode = async (verificationCode, otp) => {
    // otp is send and verificationCode is recived
    try {
        if (verificationCode === otp) {
            console.log("Email verification Completed");
            return 1
        } else {
            console.log(otp + ' : ' + verificationCode);
            console.log("Invalid OTP");
            return 'Invalid OTP'
        }
    } catch (error) {
        console.error('Error verifying code:', error);
        return error
    }
};
export { otpGenerator, handleVerifyCode, mailSender };
export default mailSender;