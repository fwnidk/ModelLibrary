import { Breadcrumb } from 'antd';
import React, { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './index.scss'

export default function FileBreadCrumb() {
    const location = useLocation().pathname;
    const getBread = useCallback(() => {
        const locationArr = decodeURI(location).split('/')
        const name = locationArr[2]
        const breadcrumbContent: Array<string> = locationArr.slice(4);
        // console.log(breadcrumbContent);
        let breadcrumbItems = (breadcrumbContent.length !== 0) ?
            [{ title: <Link to='../tree' className='breadCrumbItem'>{name}</Link> }] :
            [{ title: <span> {name} </span> }];
        let currRoute: string = '../tree'
        for (let i = 0; i < breadcrumbContent.length; i++) {
            let item = breadcrumbContent[i]
            currRoute += ('/' + item);
            if (i === breadcrumbContent.length - 1) {
                breadcrumbItems.push({ title: <span>{item}</span> })
            } else {
                breadcrumbItems.push({ title: <Link to={currRoute} className='breadCrumbItem'>{item}</Link> })
            }
        }
        return breadcrumbItems
    }, [location])
    return (
        <Breadcrumb items={getBread()} className="fileBreadcrumb" />
    )
}