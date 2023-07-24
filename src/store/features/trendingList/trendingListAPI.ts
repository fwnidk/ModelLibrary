// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import { axiosInstance } from '../../../app/axiosInterceptor';


export async function fetchTrendingList() {
    return await axiosInstance.get("/api/trendingList")
}
