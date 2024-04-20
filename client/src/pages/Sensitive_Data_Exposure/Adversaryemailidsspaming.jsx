import React from 'react'
import { useDataFetch, usePostData } from '../../hooks/DataFetchHook'
import { useSelector } from 'react-redux'
import LoadingSpinner from '../../components/LoaderAndError/loader'
const Adversaryemailidsspaming = () => {
  const UserData = useSelector((state) => state.UserReducer)

  const emailHarvesting = useDataFetch(`SensitiveDataExposure/email-harvesting?domain=${UserData.domain}`, [UserData.domain]);
  console.log("emailHarvesting", emailHarvesting)
  return (
    <div>Adversaryemailidsspaming</div>
  )
}

export default Adversaryemailidsspaming