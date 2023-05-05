// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import axios from 'axios';


export async function fetchModelDetail(name: string) {
    return await axios.post("/api/modelDetail", name)
}



