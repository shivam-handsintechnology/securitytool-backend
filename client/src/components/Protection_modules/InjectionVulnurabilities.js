import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Chart3 from '../Charts/Chart3';
import useDataFetch from '../../hooks/DataFetchHook';

const InjectionVulnurabilities = () => {
     const {domain}=useSelector((state)=>state.UserReducer)
     const AlllogsData=useDataFetch(`injections/count?domain=${domain}`, [domain],[])

    return (
        <React.Fragment>
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5><i className="fas fa-shield-alt" /> &nbsp;Protection Modules ( Injections)</h5>
                </div>
                <div className="card-body">
                    {
                        AlllogsData.errors.loading?(<div className="text-center"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>):AlllogsData.errors.error?(<h1 className=' error text-center'>{AlllogsData.errors.message}</h1>):(
                            <>
                            <div className="row">
                                <div className="col-md-6">
                               { AlllogsData.data.length>0 && <Chart3 data={AlllogsData.data} />}
                                </div>
                             
                            </div>
                            </>
                        )
                    }
                </div>
            </div>
          
        </React.Fragment>
    )
}

export default InjectionVulnurabilities