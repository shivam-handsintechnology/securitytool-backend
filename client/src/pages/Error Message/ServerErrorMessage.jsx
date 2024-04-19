import React from 'react'
import {useSelector} from "react-redux"
import {useDataFetch} from "../../hooks/DataFetchHook"
import {Link} from "react-router-dom"
const ServerErrorMessage = (props) => {
  console.log("props",props)
  const UserData = useSelector((state) => state.UserReducer)
  const ErrorMessage=useDataFetch(`ErrorMessage?domain=${UserData.domain}`,[UserData.domain])
 console.log("ErrorMessage",ErrorMessage.data)
  return (
    <div>
      {
        ErrorMessage.errors.loading ? <div>Loading...</div> : ErrorMessage.errors.error ? <div>{ErrorMessage.errors.message}</div> :
          <table className="table table-striped">
              <tbody>
        {
        ErrorMessage.data &&   ErrorMessage.data.length>0?ErrorMessage.data.map((item,index)=>(
          <tr key={index}>
              <td><strong className="text-capitalize">{item.text}</strong></td>
              <td>{item.value}</td>
              {item.value==="Yes"?<td><Link to={item.link}>Click here</Link></td>:null}
        </tr>
        ))
          :  <tr>
          <td colSpan="2">No data available</td>
        </tr>
        }
        </tbody>
            </table>

      }
    </div>
  )
}

export default ServerErrorMessage