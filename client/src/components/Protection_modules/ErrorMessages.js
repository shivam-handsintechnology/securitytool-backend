import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ErrorMessages = () => {
    const domain = useSelector((state) => state.UserReducer.domain)
    const [data, setData] = useState({})
    useEffect(() => {
        domain && axios.get(`security/test/responsecodes?hostname=${domain}`)
            .then((session) => {
                console.log("session", session.data)
                setData(session.data)
            }).catch((e) => {
                console.log(e)
            })
    }, [])

    return (
        <div className="card card-primary card-outline">
            <div className="card-header">
                <h5><i className="fas fa-shield-alt" /> &nbsp;Protection Modules (Error Message)</h5>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-12 col-lg-12">
                        <ul>
                            {Object.keys(data).length > 0 ? Object.keys(data).map((item) => (
                                <li><span><b>{item} :</b> {data[item]}</span></li>
                            )) : <li>DATA NOT FOUND</li>}


                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorMessages