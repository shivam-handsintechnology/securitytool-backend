import React from 'react'
import { useDataFetch, usePostData } from '../../hooks/DataFetchHook'
import { useSelector } from 'react-redux'

const Serversidesourcedisclosure = () => {
  const UserData = useSelector((state) => state.UserReducer)

  const postSessionData=useDataFetch(`AuthSessionGuardian/session-vulnurability?domain=${UserData.domain}`,[UserData.domain])
    console.log("postSessionData", postSessionData)
  return (
    <div>Serversidesourcedisclosure</div>
  )
}

export default Serversidesourcedisclosure