// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import { axiosInstance } from '../../../app/axiosInterceptor';

export async function fetchLogIn(logInInformation: LogInType.LogInForm) {
    let message = await axiosInstance.post('/api/login', logInInformation)
    return message
}