import React from 'react'
import { Pagination } from 'react-bootstrap';

export const PaginationComponent = ({columns,data,pageNumber,setPageNumber,totalPages,showData}) => {
    console.log("totalPages",totalPages)
    const gotoPrevious = () => {
        setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
    };
    const gotoNext = () => {
        setPageNumber((prevPage) => Math.min(prevPage + 1, totalPages));
    };
    const getVisiblePages = () => {
        const maxVisiblePages = 5;
        const pages = [];
        let startPageIndex = Math.max(1, pageNumber - Math.floor(maxVisiblePages / 2));
        let endPageIndex = Math.min(totalPages, startPageIndex + maxVisiblePages - 1);
        if (endPageIndex - startPageIndex < maxVisiblePages) {
            startPageIndex = Math.max(1, endPageIndex - maxVisiblePages + 1);
        }
        for (let i = startPageIndex; i <= endPageIndex; i++) {
            pages.push(i);
        }
        return pages;
    };
    const renderRows = (data) => {
        if (data && data.length > 0) {
            return data.map((rowData, index) => (
                <tr key={index}>
                    {columns.map((column) => {

                        return <td key={column.selector}>{column.cell ? column.cell(rowData) : rowData[column.selector]}</td>
                    })}
                </tr>
            ));
        } else {
            <></>
        }


    };
    return (
        <div>
            {totalPages > 0 ? (<>
             {showData &&  (  <table className="table">
                <thead>
                    {/* <tr className="text-table-format"> */}
                    {data && data.length > 0 ? (<tr >
                        {columns.map((column) => (
                            <th key={column.name}>{column.name}</th>
                        ))}
                        {/* {handleRowAction && <th>Action</th>} */}
                    </tr>) : <tr><td colSpan={columns.length}>No Data Found</td></tr>}

                </thead>
                <tbody >{renderRows(data)}</tbody>
                {/* <tbody className="text-table-format">{renderRows(TotalNoOfPages ? data : NewData)}</tbody> */}
                </table>) } 
                <Pagination>
                    <Pagination.Prev onClick={gotoPrevious} disabled={pageNumber === 1} />
                    {getVisiblePages().map(page => (
                        <Pagination.Item
                            style={{ background: "#2ca2c6" }}
                            key={page}
                            active={pageNumber === page}
                            onClick={() => setPageNumber(page)}
                        >
                            {page}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={gotoNext} disabled={pageNumber === totalPages} />
                </Pagination>
            </>) : (<></>)}
        </div>
    )
  
}
