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
        let currRoute: string = ''
        const breadcrumbItems: Array<{ title: JSX.Element }> = breadcrumbContent.map((item) => {
            currRoute = currRoute === '' ?
                item :
                currRoute + '/' + item;
            return { title: <Link to={currRoute} className='breadCrumbItem'>{item}</Link> }
        })
        breadcrumbItems.unshift(
            { title: <Link to={``} className='breadCrumbItem'>{name}</Link> },
        )
        return breadcrumbItems
    }, [location])
    return (
        <Breadcrumb items={getBread()} className="fileBreadcrumb" />
    )
}
