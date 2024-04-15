import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Chart3 from '../Charts/Chart3';
import Chart4 from '../Charts/Chart4';

const InjectionVulnurabilities = () => {
    const { xframe } = useSelector((state) => state.LogDataReducer)
    const [counts, setCounts] = useState({})
    const [errors, setErrors] = useState({
        error: false,
        loading: true
    });

    const [middlewareState, setMiddlewareState] = useState({});

    const handleMiddlewareChange = async (event) => {
        try {
            const isChecked = event.target.checked;
            await axios.post("security/middlwares/switch", {
                [event.target.name]: isChecked
            }).then((response) => {
                setMiddlewareState(response.data);
            }).catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    };

    const getAllMiddlewares = async () => {
        setErrors((prev) => ({ ...prev, loading: true, error: false }));
        try {
            const response = await axios.get('security/middlwares');

            console.log("middlwares", response.data);
            setMiddlewareState(response.data);
            setErrors((prev) => ({ ...prev, loading: false, error: false }));
        } catch (error) {
            setMiddlewareState({});
            setErrors((prev) => ({ ...prev, loading: false, error: true }));
            console.error(error);
        }
    };


    const GetallInjectionscount = (async () => {
        await axios.get(`security/sqllogs/count`).then((response) => {
            const { data, statusCode } = response
            if (statusCode === 200) {
                // console.log("data>>>", data)
                setCounts(data)
            }
        }

        ).catch((error) => {
            console.log(error)
            setCounts({})
        })
    })


    useEffect(() => {
        GetallInjectionscount()
        getAllMiddlewares()
    }, [])
    console.log("counts", counts)
    return (
        <React.Fragment>
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5><i className="fas fa-shield-alt" /> &nbsp;Protection Modules ( Injections)</h5>
                </div>
                <div className="card-body">
                    {counts && counts.length >0  && <Chart4 data={counts} title={"Injections"}/>}
                    {/* <div className="row">
                        {
                            Object.keys(middlewareState).length > 0 ? Object.keys(middlewareState).map((propertyname) => (
                                <div className="col-md-3">
                                    <div className="card card-body bg-light">
                                        <center>

                                            <strong><i className="fas fa-code" /> {`${propertyname == "SqlDetectorMiddlware" ? "SQL Injection" : propertyname == "BotMiddleware" ? "Bad Boats" : propertyname == "VpnProtectMiddlware" ? "Proxy" : propertyname == "SpamMiddleware" ? "Spams" : propertyname == "xssInjectionDetectorMiddlware" ? "Cross-Site Scripting" : propertyname == "checkHTMLMiddlware" ? "Html Injection" : propertyname == "NosqlDetectorMiddlware" ? "Nosql Injection" : propertyname == "commandlineinjectionMiddlware" ? "Command Line Injections" : "propertyname"}`}</strong><br />Protection<hr />
                                            <div class="box-4">
                                                <input type='checkbox' name={propertyname} id="sqlCheckbox" checked={middlewareState[propertyname]} onChange={handleMiddlewareChange} />
                                                <span class="toogle"></span>

                                            </div>
                                        </center>
                                    </div>
                                </div>

                            )) : <React.Fragment></React.Fragment>

                        }

                    </div> */}
                    <div>
                        {/* <ul>
                            {Object.keys(counts).length > 0 ? Object.keys(counts).map((propertyname) => (
                                <li key={propertyname}>
                                    <strong>
                                        {propertyname === "cmd" ? "Application is vulnerable to Command injection attack" :
                                            propertyname === "html" ? "Application is vulnerable to HTML injection attack" :
                                                propertyname === "SQLI" ? "Application is vulnerable to SQL Injection" :
                                                    propertyname === "XML-Injection" ? "Application is vulnerable to XML injection" : ""}
                                        :
                                    </strong>
                                    <span>{counts[propertyname] > 0 ? "Yes" : "No"}</span>

                                    <Link to={`logs/${propertyname}`}> View Logs <i className="fas fa-arrow-circle-right" /></Link>
                                </li>
                            )) : <React.Fragment></React.Fragment>}



                            <li><strong>Application is vulnerable to iframe injection attack</strong>: {xframe || ""}</li>
                        </ul> */}


                    </div>


                </div>
            </div>
            <div className="col-lg-12">
                <div className="row justify-content-center mt-3">
                    {/* {counts.length > 0 ? counts.map((item) => (
                        <div className="col-sm-3 col-lg-3">
                            <div className="card card-primary card-outline card-height">
                                <div className="card-body text-center">

                                    <p className="text-uppercase  ">{item?.title} Injections {" "}
                                        {item.count.count === 0 ? <a className="small-box-footer" >No Logs </a> : <Link to={`/logs/${item?.title}`} className="small-box-footer">View Logs <i className="fas fa-arrow-circle-right" /></Link>}
                                    </p>
                                    <i className="fas fa-code " />
                                    <hr />
                                    <p className="h3 text-thin">{item?.count?.count}</p>
                                </div>
                            </div>
                        </div>
                    )) : <React.Fragment></React.Fragment>} */}
                </div>
            </div>
        </React.Fragment>
    )
}

export default InjectionVulnurabilities