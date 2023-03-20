import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router'
import { RootState } from '../../store/store';

export default function CodeEditor() {
    const location = useLocation().pathname;
    const { data, isLoading, isError } = useSelector((state: RootState) => state.fileContent)
    useEffect(() => {
        let locaitonArr = decodeURI(location).split('/')
        //文件名
        let fileName = locaitonArr[2]
        //文件路径
        let filePath = locaitonArr.slice(4).join('/')
        console.log('fileName: ', fileName);
        console.log('filePath: ', filePath);
        console.log(data);
    }, [data, location])
    
    return (
        <div>CodeEditor</div>
    )
}
