import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
const GoBack = () => {
    const navigate=useNavigate()
  return (
    <>
    <Button onClick={()=>navigate(-1)}>Go Back</Button>
    </>
  )
}

export default GoBack