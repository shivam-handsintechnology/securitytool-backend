import React from 'react'
import LoadingSpinner from '../LoaderAndError/loader'
import { useSelector } from 'react-redux'
import useDataFetch from '../../hooks/DataFetchHook'
const SSLInfo = () => {
    const userData = useSelector(state => state.UserReducer)
    const SSlInfo = useDataFetch(`SSLVerify?domain=${userData.domain}`, [userData.domain],)
    console.log("SSlInfo",SSlInfo)
  
   
    

    return (
      <>
        <React.Fragment>
            {
                SSlInfo.errors.loading ? <LoadingSpinner /> :SSlInfo.errors.error ? <h1 className=' error text-center'>{SSlInfo.errors.message}</h1> : 
              
                <div className="container-fluid">
                      {SSlInfo.data  && (
                        <>
                       <div className="row">
                        <div className="col-sm-3 col-lg-3">
                            <div className="small-box  bg-primary">
                                <div className="inner">
                                    <p>{SSlInfo.data.valid }</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-lg-3">
                            <div className="small-box bg-success">
                                <div className="inner">
                                    <p>{SSlInfo.data.self}</p>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-lg-3">
                            <div className="small-box bg-primary">
                                <div className="inner">
                             
                                    <p className='mb-0'>{SSlInfo.data.negotiatedProtocol }</p>
                            
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-lg-3">
                            <div className="small-box bg-primary">
                                <div className="inner">
                          
                                    <p className='mb-0' id="">{SSlInfo.data.cookieSecureFlag }</p>
                           
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3 col-lg-3 ">
                            <div className="small-box bg-success">
                                <div className="inner">

                                    <p className='mb-0'>{SSlInfo.data.expired}</p>
                                </div>
                            </div>
                        </div>

                    </div>
                        </>
                      ) }
                 
                </div>
            }
        </React.Fragment>
      </>



    )
}

export default SSLInfo
