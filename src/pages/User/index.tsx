import React, { useEffect } from 'react'
import { useParams } from 'react-router'

export default function User() {
    const { id } = useParams();
    useEffect(() => {
        console.log(id);
    }, [id])
    return (
        <div>{id}</div>
    )
}
