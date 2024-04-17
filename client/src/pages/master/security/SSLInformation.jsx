import React from 'react'
import SSLInfo from '../../../components/Protection_modules/SSLInfo'
const SSLInformation = () => {
    return (
        <React.Fragment>
            <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="m-0 heading">
                                <i class="fa fa-expeditedssl" aria-hidden="true"></i> SSL
                            </h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="dashboard.php">
                                        <i className="fas fa-home" /> Admin Panel
                                    </a>
                                </li>
                                <li className="breadcrumb-item active"> SSl</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <div className="content">
                <SSLInfo />
            </div>
        </React.Fragment>
    )
}

export default SSLInformation