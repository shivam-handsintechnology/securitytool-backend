import React, { useEffect, useState } from 'react'
import axios from 'axios'
const SessionInfo = () => {
    const [sessioons, setSesion] = useState([])
    useEffect(() => {
        (async () => {
            await axios.get('security/test/session-data')
                .then((session) => {
                    console.log(session)
                    setSesion(session.data)
                }).catch((e) => {
                    console.log(e)
                })
        })()
    }, [])
    return (
        <div>
            <div>
                {/*CONTENT CONTAINER*/}
                {/*===================================================*/}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 ">
                                    <i class="fa-brands fa-expeditedssl" /> Session Info
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="dashboard.php">
                                            <i className="fas fa-home" /> Admin Panel
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active"> Session</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Page content*/}
                {/*===================================================*/}
                <div className="content">
                    <div>
                        <h1>Data Table</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th>Category</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sessioons ?
                                    sessioons.map((item, index) => (
                                        <tr key={index}>
                                            <td>{Object.keys(item)[0]}</td>
                                            <td>{Object.values(item)[0]}</td>
                                        </tr >
                                    ))
                                    : (<div></div>)}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/*===================================================*/}
                {/*End page content*/}
            </div>
        </div>
    )
}

export default SessionInfo
