// A mock function to mimic making an async request for data
import "../../../app/mock"
import axios from 'axios';


export async function fetchPersonalFiles(postData: string) {
    return await axios.post("/api/personalFiles", postData)
}
