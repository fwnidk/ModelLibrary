// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import axios from 'axios';


export async function fetchTrendingList(postData: string) {
    return await axios.post("/api/trendingList", postData)
}
