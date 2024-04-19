import React from 'react'
import { useDataFetch, usePostData } from '../../hooks/DataFetchHook'
import { useSelector } from 'react-redux'

const OPTIONSmethod = () => {
  const UserData = useSelector((state) => state.UserReducer)

  const postSessionData=useDataFetch(`SecurityMisconfiguration/option-methods-enabled?domain=${UserData.domain}`,[UserData.domain])
  console.log("postSessionData", postSessionData)
return (
  <div>
  {postSessionData.errors.loading ? <p>Loading...</p> : postSessionData.errors.error ? <p>{postSessionData.errors.message}</p> :
   <table className="table table-striped">
   <tbody>
     {postSessionData.data && postSessionData.data.length > 0 ? (
      <>
      <tr>
        Option Methods Enabled
      </tr>
      {
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
      }
      </>
     ) : (
       <tr>
         <td colSpan="2">Option Methods Not Found</td>
       </tr>
     )}
   </tbody>
 </table>
  }
</div>
)
}

export default OPTIONSmethod