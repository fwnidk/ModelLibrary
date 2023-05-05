import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import DiffComponent from '../DiffComponent'
// import '../../app/icons/mock'


export default function Commit() {
    const [fileDiffList, setFileDiffList] = useState<any>(undefined)
    const itemName = useParams().search;
    useEffect(() => {
        const getFileDiffList = async () => {
            const res = await axios.post('/api/getPrevAndNewFile', itemName);
            console.log('res: ', res.data);
            setFileDiffList(res.data);
        }
        getFileDiffList();
    }, [])

    return (
        fileDiffList ? <DiffComponent diffDataList={fileDiffList} documentChangesOverview={true} /> : <></>
    )
}
