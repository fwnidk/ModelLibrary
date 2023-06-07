// A mock function to mimic making an async request for data
import { axiosInstance } from '../../../app/axiosInterceptor';
export async function fetchSearch(search:string) {
  let message = await axiosInstance.get(`https://api.github.com/search/users?q=${search}`)
  return message
}
