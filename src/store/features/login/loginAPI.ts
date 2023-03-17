// A mock function to mimic making an async request for data
import "../../../app/mock"
import axios from 'axios';

export async function fetchLogin(loginInformation: LoginType.LoginForm | string) {
    let message = await axios.post('/api/login', loginInformation)
    return message
}
