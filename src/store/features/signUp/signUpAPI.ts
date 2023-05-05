// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import axios from 'axios';

export async function fetchVerifyUsername(username:string) {
    let message = await axios.post('/api/verifyUsername', username)
    return message
}

export async function fetchSignUp(signUpInformation: SignUpType.SignUpForm) {
    console.log(signUpInformation);
    let message = await axios.post('/api/signUp', signUpInformation)
    return message
}