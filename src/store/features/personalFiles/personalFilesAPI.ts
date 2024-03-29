// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import { axiosInstance } from '../../../app/axiosInterceptor';


export async function fetchPersonalFiles(postData: string) {
    console.log(postData);
    return await axiosInstance.post("/api/personalFiles", postData)
}
