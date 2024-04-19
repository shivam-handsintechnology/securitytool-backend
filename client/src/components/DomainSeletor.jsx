import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useDataFetch } from "../hooks/DataFetchHook";
import { PaginationComponent } from "../hooks/PaginationComponent";
import { setUserDetails } from "../redux/reducers/UserReducer";
const DomainSeletor = () => {
    const [limit, setLimit] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    // Assign All Funtions
    const dispatch = useDispatch()
    const getAllDomains = useDataFetch(`security/domain?limit=${limit}&page=${pageNumber}`, [pageNumber])
    console.log("getAllDomains",getAllDomains)
   // Add Columns/Rows
    const columns = [
      {
        name: "Domain",
        selector: "domain",
  
      },
      {
        name: "Action",
        cell: (row) => <Button onClick={() => dispatch(setUserDetails({domain:row.domain,type:row.type}))} variant="primary">Select Domain</Button>,
      }
    ];
  return (
    <div>
    {getAllDomains.data && getAllDomains.data.data.length > 0 ? (
     <div>
       {/* Render pagination component */}
       <PaginationComponent
         columns={columns}
         data={getAllDomains.data.data}
         pageNumber={pageNumber}
         setPageNumber={setPageNumber}
         totalPages={getAllDomains.data.totalPages}
         showData={true}
       />
     </div>
   ) : (
     <h1>No Data Found</h1>
   )}
</div>
  )
}

export default DomainSeletor