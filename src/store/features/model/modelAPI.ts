// A mock function to mimic making an async request for data
import "../../../app/mock"
import axios from 'axios';


export async function fetchModelList(activeFilters: ModelType.ActiveFiltersPost, otherOptions: ModelType.OtherOptions, first: boolean, resetPageIndex: boolean) {
    //判断是否首次加载list
    let postData = [activeFilters, otherOptions]
    if (first) {
        return await axios.post("/api/modelList", postData)
    } else {
        //非首次加载则判断是否为换页操作
        if (resetPageIndex)
            return await axios.post("/api/modelList", postData)
        else {
            return await axios.post("/api/modelListPage", postData)
        }
    }
}



