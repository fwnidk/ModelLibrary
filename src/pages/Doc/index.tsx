import React from 'react'
import DiffComponent from '../../components/DiffComponent'

export default function Doc() {
    const fileDiffList = [{
        prevData:
            `fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
Hello world,I'm fwnidk !
fwnidk fwnidk fwnidk fwnidk `, // 旧数据
        newData:
            `fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
Hello world,I'm fwindk !
fwnidk fwnidk fwnidk fwnidk `,  // 新数据
        oldFileName: 'fwnidk.txt', // 文件名
        newFileName: 'fwnidk.txt', // 文件名
    },
    {
        oldData: '',
        // 旧数据
        newData:
            `fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
fwnidk fwnidk fwnidk fwnidk 
Hello world,I'm fwnidk !
fwnidk fwnidk fwnidk fwnidk `,// 新数据
        oldFileName: 'fwnidk.txt',
        newFileName: 'fwnidk2.txt',
    }]

    return (
        <DiffComponent
            diffDataList={fileDiffList}
        />
    )
}
