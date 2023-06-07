// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import { axiosInstance } from '../../../app/axiosInterceptor';

export async function fetchVerifyUsername(username:string) {
    let message = await axiosInstance.post('/api/verifyUsername', username)
    return message
}

export async function fetchSignUp(signUpInformation: SignUpType.SignUpForm) {
    console.log(signUpInformation);
    let message = await axiosInstance.post('/api/signUp', signUpInformation)
    return message
}