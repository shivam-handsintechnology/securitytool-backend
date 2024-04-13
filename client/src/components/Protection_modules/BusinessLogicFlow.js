import React from 'react'
import { useSelector } from 'react-redux'

const BusinessLogicFlow = () => {
    const data = useSelector((state) => state.LogDataReducer)
    let businessLogicFlow = data.sessionvulnerability && data.sessionvulnerability["Can session puzzling be used to bypass authentication or authorization?"] ? data.sessionvulnerability["Can session puzzling be used to bypass authentication or authorization?"]?.split(":")[0] : "No"
    console.log("businessLogicFlow", businessLogicFlow)
    return (
        <>
            <div className="card card-primary card-outline">
                <div className="card-header">
                    <h5><i className="fas fa-shield-alt" /> &nbsp;Protection Modules (Business Logic Flow)</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12 col-lg-12">
                            <ul>
                                <li><span><b>Can session puzzling be used to bypass authentication or authorization ? :</b>{" " + businessLogicFlow}</span></li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BusinessLogicFlow