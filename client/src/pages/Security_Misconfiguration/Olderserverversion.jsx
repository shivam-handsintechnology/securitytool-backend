import React from 'react'
import { useDataFetch, usePostData } from '../../hooks/DataFetchHook'
import { useSelector } from 'react-redux'

const Olderserverversion = () => {
  const UserData = useSelector((state) => state.UserReducer)

  const PasswordInsecureData=useDataFetch(`SecurityMisconfiguration/passwords-insecure?domain=${UserData.domain}&type=nodejs`,[UserData.domain])
  const supportOldNodejVersion=useDataFetch(`SecurityMisconfiguration/support-oldnodejs-version?domain=${UserData.domain}&type=nodejs`,[UserData.domain])
   const WeekPassword=useDataFetch(`SecurityMisconfiguration/week-passwords-insecure?domain=${UserData.domain}&type=nodejs`,[UserData.domain])

  return (
   <>
  {
    PasswordInsecureData.errors.loading ? <p>Loading...</p> : PasswordInsecureData.errors.error ? <p>{PasswordInsecureData.errors.message}</p> :
    <table className="table table-striped">
    <tbody>
       <>
       <tr>
         Password Insecure
       </tr>
       <td>{PasswordInsecureData.data}</td>
       </>
    
    </tbody>
  </table>
  }
  {
    supportOldNodejVersion.errors.loading ? <p>Loading...</p> : supportOldNodejVersion.errors.error ? <p>{supportOldNodejVersion.errors.message}</p> :
    <table className="table table-striped">
    <tbody>
       <>
       <tr>
         Support Old Nodejs Version
       </tr>
      <td>{supportOldNodejVersion.data && supportOldNodejVersion.data.older_version_support?"Yes":"No"}</td>
       </>
      
    </tbody>
  </table>
  }
  {
    WeekPassword.errors.loading ? <p>Loading...</p> : WeekPassword.errors.error ? <p>{WeekPassword.errors.message}</p> :
    <table className="table table-striped">
    <tbody>
       <>
       <tr>
         Week Password
       </tr>
       <td>{WeekPassword.data}</td>
       </>
      
    </tbody>
  </table>

  }
   </>
  )
}

export default Olderserverversion