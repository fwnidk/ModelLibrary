// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import { axiosInstance } from '../../../app/axiosInterceptor';

export async function fetchDatasetDetail(name: string) {
    return await axiosInstance.get(`/api/dataset?name=${encodeURIComponent(name)}`)
}
