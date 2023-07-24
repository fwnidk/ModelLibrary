// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import { axiosInstance } from '../../../app/axiosInterceptor';

export async function fetchFileContent(filepath: string) {
    let message = await axiosInstance.get(`/api/getBlob?filepath=${encodeURIComponent(filepath)}` )
    return message
}
