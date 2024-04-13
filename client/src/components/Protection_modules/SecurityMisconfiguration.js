import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useDataFetch from '../../hooks/DataFetchHook'
// import Chart from 'chart.js/auto';
import Chart1 from '../Charts/Chart1';
import MyChart from '../Charts/Mychart';

const SecurityMisconfiguration = (props) => {
    const userData = useSelector((state) => state.UserReducer)
    const arbitraryMethods = useDataFetch(`SecurityMisconfiguration/arbitrary-methods?domain=${userData.domain}`, [userData.domain], null, false)
    const dangerousMethods = useDataFetch(`SecurityMisconfiguration/dangerous-http-methods-enabled?domain=${userData.domain}`, [userData.domain], null, false)
    const passwordTestHash = useDataFetch(`SecurityMisconfiguration/passwords-insecure?domain=${userData.domain}`, [userData.domain], null, false)
    const Nodejs = useDataFetch(`SecurityMisconfiguration/support-oldnodejs-version?domain=${userData.domain}`, [userData.domain])    
    const OptionMethods = useDataFetch(`SecurityMisconfiguration/option-methods-enabled?domain=${userData.domain}`, [userData.domain])    
   console.log("dangerousMethods",dangerousMethods.data)
   console.log("OptionMethods",OptionMethods)
   console.log("arbitraryMethods",arbitraryMethods)
   const chartData=[
    {labels:"Application database stores password in plain text",values:passwordTestHash.data ? passwordTestHash.data : ""},
    {labels:"Application supports older server version",values:Nodejs.data && Nodejs.data.older_version_support?"Yes" :"No"},
   ]
    return (
        <React.Fragment>
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5><i className="fas fa-shield-alt" /> &nbsp;Protection Modules (Security Misconfiguration)</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                       
                        <div className="col-md-12 col-lg-12">
                                <Chart1 data={arbitraryMethods.data} />
                        </div>
                        <div className="col-md-12 col-lg-12">
                             <Chart1 data={chartData} />
                        </div>
                        <div className="col-md-12 col-lg-12">
                            {OptionMethods.data && OptionMethods.data &&
                                <Chart1 data={OptionMethods.data} />}
                        </div>
                        <div className="col-md-12 col-lg-12">
                            {dangerousMethods.data && dangerousMethods.data &&
                                <Chart1 data={dangerousMethods.data} />}
                       
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SecurityMisconfiguration