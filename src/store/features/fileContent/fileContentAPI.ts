// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import axios from 'axios';

export async function fetchFileContent(filepath: string) {
    let message = await axios.post('/api/getBlob', filepath)
    return message
}
