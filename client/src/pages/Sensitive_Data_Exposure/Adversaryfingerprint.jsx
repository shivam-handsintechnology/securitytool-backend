import React from 'react'
import { useSelector } from 'react-redux'
import useDataFetch from '../../hooks/DataFetchHook'
import LoadingSpinner from '../../components/LoaderAndError/loader'
const Adversaryfingerprint = () => {
    const UserData = useSelector((state) => state.UserReducer)
    const postSessionData=useDataFetch(`SensitiveDataExposure/fingerprint-detection?domain=${UserData.domain}`,[UserData.domain])
    console.log("postSessionData", postSessionData)
  return (
    <div>
    {postSessionData.errors.loading ? (
      <LoadingSpinner />
    ) : postSessionData.errors.error ? (
      <p>{postSessionData.errors.message}</p>
    ) : (
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
      
    )}
  </div>
  
  )
}

export default Adversaryfingerprint