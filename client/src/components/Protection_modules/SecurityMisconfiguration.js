import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useDataFetch from '../../hooks/DataFetchHook'
// import Chart from 'chart.js/auto';
import Chart1 from '../Charts/Chart1';
import MyChart from '../Charts/Mychart';
import LoadingSpinner from '../LoaderAndError/loader';


const SecurityMisconfiguration = (props) => {
    const userData = useSelector((state) => state.UserReducer)
    const arbitraryMethods = useDataFetch(`SecurityMisconfiguration/arbitrary-methods?domain=${userData.domain}`, [userData.domain],[])
    const dangerousMethods = useDataFetch(`SecurityMisconfiguration/dangerous-http-methods-enabled?domain=${userData.domain}`, [userData.domain],[])
    const passwordTestHash = useDataFetch(`SecurityMisconfiguration/passwords-insecure?domain=${userData.domain}`, [userData.domain],"")
    const passwordWeekTest = useDataFetch(`SecurityMisconfiguration/week-passwords-insecure?domain=${userData.domain}`, [userData.domain],"")
    const Nodejs = useDataFetch(`SecurityMisconfiguration/support-oldnodejs-version?domain=${userData.domain}`, [userData.domain])    
    const OptionMethods = useDataFetch(`SecurityMisconfiguration/option-methods-enabled?domain=${userData.domain}`, [userData.domain],[])    
  
    return (
        <React.Fragment>
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5><i className="fas fa-shield-alt" /> &nbsp;Protection Modules (Security Misconfiguration)</h5>
                </div>
                <div className="card-body">
                    {
                      arbitraryMethods.errors.loading  || dangerousMethods.errors.loading || passwordTestHash.errors.loading || Nodejs.errors.loading || OptionMethods.errors.loading ? (
                       <LoadingSpinner/>
                        ) : arbitraryMethods.errors.error || dangerousMethods.errors.error || passwordTestHash.errors.error || Nodejs.errors.error || OptionMethods.errors.error ? (

                            <p className='error'>{arbitraryMethods.errors.message}</p>
                        ) : (
                            <ul>
                                <li className='list-unstyled'>Application accepts arbitrary methods :{arbitraryMethods.data && arbitraryMethods.data.length>0?"Yes":"No"}</li>
                                
                                <li  className='list-unstyled'>Application database stores password in plain text :  {passwordTestHash.data}</li>
                                <li  className='list-unstyled'>Support Old Nodejs Version :{Nodejs.data && Nodejs.data.older_version_support ? "Yes" : "No"}</li>
                                <li  className='list-unstyled'>Dangerous HTTP Methods : {dangerousMethods.data && dangerousMethods.data.length > 0 ? "Yes":"No"}</li>
                                <li  className='list-unstyled'>Option Methods Enabled : {OptionMethods.data && OptionMethods.data.length>0?"Yes":"No"}</li>
                                <li  className='list-unstyled'>Password is encrypted/encoded using weak algorithm : {passwordWeekTest.data}</li>
                             
                            </ul>
                        )
                    }
                    <ul>
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SecurityMisconfiguration