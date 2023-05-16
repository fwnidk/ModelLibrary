// A mock function to mimic making an async request for data
// import "../../../app/icons/mock"
import axios from 'axios';


export async function fetchDatasetList(activeFilters: DatasetType.ActiveFiltersPost, otherOptions: DatasetType.OtherOptions) {
    //判断是否首次加载list
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
                str = str.toLocaleLowerCase()
            }
            paramsArr.push(option + '=' + str)
        }
    }
    let getParams = '?' + paramsArr.join('&').replace(' ', '-')
    console.log('getParams: ', getParams);
    return await axios.get(`/api/datasetList${getParams}`)
}

export async function fetchDatasetLabel() {
    return await axios.get("/api/datasetLabel")
}


