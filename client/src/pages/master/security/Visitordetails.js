import React, { useEffect } from "react";
import Footer from "../../../components/Layout/Footer";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Visitordetails = () => {
    const [data, setData] = useState({})
    const { ip } = useParams()
    async function getSingleSqllLogs(body) {
        const response = await axios.post(`security/sqllogs/single`, body);
        console.log(response)
        return response
    }

    console.log(data)
    useEffect(() => {
        getSingleSqllLogs({ ip }).then((res) => {
            const { data } = res
            setData(data)
        })
    }, [ip])
    console.log("data0", data)
    return (
        <div>
            {/* <Headers />
            <Menu /> */}
            <div>
                {/*CONTENT CONTAINER*/}
                {/*===================================================*/}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 ">
                                    <i className="fas fa-align-justify" /> Visitor Details
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <a href="dashboard.php">
                                            <i className="fas fa-home" /> Admin Panel
                                        </a>
                                    </li>
                                    <li className="breadcrumb-item active">Visitor Details</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                {/*Page content*/}
                {/*===================================================*/}
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card card-primary card-outline">
                                    <div className="card-header">
                                        <h3 className="card-title">Details for Ip Address: {data ? data?.ip : "Ip is not available"}</h3>

                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-user" /> IP Address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data?.ip}
                                                        readOnly=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-calendar-alt" /> Date &amp; Time
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data?.date + "at " + data?.time}
                                                        readOnly=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-globe" /> Browser
                                                    </label>
                                                    <div className="input-group mar-btm">
                                                        <span className="input-group-addon">
                                                            {data?.browser}
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={data?.browser}
                                                            readOnly=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-desktop" /> Operating System
                                                    </label>
                                                    <div className="input-group mar-btm">
                                                        <span className="input-group-addon">
                                                            {data?.os}
                                                        </span>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={data?.os}
                                                            readOnly=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-flag" /> Country
                                                    </label>
                                                    <div className="input-group mar-btm">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={data?.country}
                                                            readOnly=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-map-pin" /> Country Code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data?.country}
                                                        readOnly=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-mobile-alt" /> Device Type
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data?.device}
                                                        readOnly=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-atlas" /> Domain
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data?.domain}
                                                        readOnly=""
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label className="control-label">
                                                    <i className="fas fa-link" /> Visited Page
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={data?.page}
                                                    readOnly=""
                                                />
                                            </div>
                                        </div>
                                        <br />
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-robot" /> Bot
                                                    </label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={data?.bot}
                                                        readOnly=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-sm-8">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-user-secret" /> User Agent
                                                    </label>
                                                    <textarea
                                                        placeholder="User Agent"
                                                        rows={2}
                                                        className="form-control"
                                                        readOnly=""
                                                        value={data?.useragent}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label className="control-label">
                                                    <i className="fas fa-reply" /> Referer URL
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={data?.referurl}
                                                    readOnly=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*===================================================*/}
                {/*End page content*/}
            </div>




        </div>
    );
}

export default Visitordetails

