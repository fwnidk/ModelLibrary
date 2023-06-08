// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import { axiosInstance } from '../../../app/axiosInterceptor';

export async function fetchVerifyUsername(username: string) {
    let message = await axiosInstance.post('/api/register/verifyUsername', {username})
    return message
}

export async function fetchRegister(registerInformation: any) {
    console.log(registerInformation,'registerInformation');
    let message = await axiosInstance.post('/api/register/submitUserInfo', registerInformation, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return message
}