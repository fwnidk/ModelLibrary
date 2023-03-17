// A mock function to mimic making an async request for data
import axios from 'axios';
export async function fetchSearch(search:string) {
  let message = await axios.get(`https://api.github.com/search/users?q=${search}`)
  return message
}
