// A mock function to mimic making an async request for data
import axios from 'axios';
// import { createRandomModelListData } from '../../../app/mock'

// if (process.env.NODE_ENV === "development") {
//     createRandomModelListData()
// }


export async function fetchModelList(activeFilters: ModelType.ActiveFiltersPost, otherOptions: ModelType.OtherOptions) {
    //判断是否首次加载list
    // let postData = [activeFilters, otherOptions]
    // ?pipeline_tag=image-classification&library=transformers&sort=downloads
    let paramsArr = []
    for (let filter in activeFilters) {
        let arr = (activeFilters as any)[filter]
        if (arr.length !== 0) {
            let currParams = filter + '=' + arr.join(',').toLocaleLowerCase();
            paramsArr.push(currParams)
        }
    }
    for (let option in otherOptions) {
        if (!(option === 'filterByName' && (otherOptions as any)[option] === '')) {
            let str = (otherOptions as any)[option]
            if (typeof (str) === 'string') {
                str = str.toLowerCase()
            }
            paramsArr.push(option + '=' + str)
        }
    }
    let getParams = ('?' + paramsArr.join('&')).replace(' ', '-')
    return await axios.get(`/api/modelList${getParams}`)
    // if (first) {
    //     return await axios.post("/api/modelList", postData)
    // } else {
    //     //非首次加载则判断是否为换页操作
    //     if (resetPageIndex)
    //         return await axios.post("/api/modelList", postData)
    //     else {
    //         return await axios.post("/api/modelListPage", postData)
    //     }
    // }
}
export async function fetchModelLabel() {
    return await axios.get("/api/modelLabel")
}