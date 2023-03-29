// A mock function to mimic making an async request for data
import "../../../app/mock"
import axios from 'axios';

export async function fetchSignUp(signUpInformation: SignUpType.SignUp) {
    let message = await axios.post('/api/signUp', signUpInformation)
    return message
}