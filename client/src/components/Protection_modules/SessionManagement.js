import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setLogsData } from '../../redux/reducers/LogsDataReducer'
import { useDataFetch, usePostData } from '../../hooks/DataFetchHook'
import { Validators } from '../../utils/Validators/Validator'

const SessionManagement = () => {
  const data = useSelector((state) => state.LogDataReducer)
  const UserData = useSelector((state) => state.UserReducer)
  let validation = null
  const showErrorToast = true
  const postSessionData = useDataFetch(`AuthSessionGuardian/session-vulnurability?domain=${UserData.domain}`, [UserData.domain], validation, showErrorToast)
  console.log("postSessionData", postSessionData)

  return (
    <div className="card card-primary card-outline">
      <div className="card-header">
        <h5><i className="fas fa-shield-alt" /> &nbsp;Protection Modules ( Broken Authentication and Session Management)</h5>
      </div>
      <div className="card-body">
        <div className="row">

          <div className="col-md-12 col-lg-12">
            <table className="table table-striped">
              <tbody>
                {postSessionData.data && postSessionData.data.length > 0 ? (
                  postSessionData.data.map((obj, index) => (
                    <tr key={index}>
                      {Object.entries(obj).map(([key, value]) => (
                        <React.Fragment key={key}>
                          <td><strong className="text-capitalize">{key}</strong></td>
                          <td>{value}</td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2">No data available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>


      </div>
    </div>
  )
}

export default SessionManagement