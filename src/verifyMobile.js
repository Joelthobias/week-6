import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import auth from './firebase.js'
const onCaptchVerify = async () => {
    if (!window.recaptchaVerifier) {

        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', {
            'size': 'invisible',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                console.log(response);
            }
        });
    }
}
const handleSendCode = async (phoneNumber) => {
    try {
        onCaptchVerify()
        const appVerifier = window.recaptchaVerifier;
        console.log('called');

        let newPhone = '+91' + phoneNumber
        signInWithPhoneNumber(auth, newPhone, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                return 1;
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                window.recaptchaVerifier.clear()
                console.log(error);
                return error;
            });
    } catch (error) {
        console.error('Error sending verification code:', error); 
        return error;

    }
};

const VerifyCode = async (verificationCode) => {
    try {
        window.confirmationResult.confirm(verificationCode).then(async (result) => {
            // User signed in successfully.

            const user = result.user;
            if (user) {
                console.log('Mobile number verified');
                return 1;
            }
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            console.log(error);
            return error;
        });
    } catch (error) {
        console.error('Error verifying code:', error);
        return error;
    }
};
export {handleSendCode, VerifyCode}
export default handleSendCode