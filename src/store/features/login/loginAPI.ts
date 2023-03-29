// A mock function to mimic making an async request for data
import "../../../app/mock"
import axios from 'axios';

export async function fetchLogIn(logInInformation: LogInType.LogInForm | string) {
    let message = await axios.post('/api/logIn', logInInformation)
    return message
}