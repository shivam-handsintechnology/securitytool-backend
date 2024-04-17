import React from 'react'
import { useDataFetch, usePostData } from '../../hooks/DataFetchHook'
import { useSelector } from 'react-redux'

const Helpfulerrormessage = (props) => {
  const UserData = useSelector((state) => state.UserReducer)

  const postSessionData=useDataFetch(`ErrorMessage/login-error-messages?domain=${UserData.domain}&type=nodejs`,[UserData.domain])
    console.log("postSessionData", postSessionData)
  return (
    <div>
        {props.Goback}
      {postSessionData.errors.loading ? (
        <p>Loading...</p>
      ) : postSessionData.errors.error ? (
        <p>{postSessionData.errors.message}</p>
      ) : (
        <>
        <h1>Helpful error message displayed at login page: {postSessionData.data &&  postSessionData.data.length>0?"Yes":"No"}</h1>
        <table className="table table-striped">
          <tbody>
            {postSessionData.data && postSessionData.data.length>0 ?postSessionData.data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.code}</td>
              </tr>
            )):null}
          </tbody>
        </table>
        </>
      
      )}
    </div>
  )
}

export default Helpfulerrormessage