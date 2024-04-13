import { useEffect, useState } from "react";
import Pagination from 'react-bootstrap/Pagination';

function UsePagination(data, TotalNoOfPages) {
  const [limit, setLimit] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [Pages, setPages] = useState(null)
  const gotoPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };
  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 5;
    const halfMaxVisiblePages = Math.floor(maxVisiblePages / 2);

    let startPageIndex = Math.max(1, pageNumber - halfMaxVisiblePages);
    let endPageIndex = Math.min(numberOfPages, pageNumber + halfMaxVisiblePages);

    if (endPageIndex - startPageIndex < maxVisiblePages - 1) {
      if (startPageIndex === 1) {
        endPageIndex = Math.min(numberOfPages, startPageIndex + maxVisiblePages - 1);
      } else {
        startPageIndex = Math.max(1, endPageIndex - maxVisiblePages + 1);
      }
    }

    for (let i = startPageIndex; i <= endPageIndex; i++) {
      visiblePages.push(i);
    }
    return visiblePages;
  };


  const pageComponent = () => (


    numberOfPages > 0 ? (<>
      {/* <Pagination className="justify-content-center"> */}
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
        <Pagination.Next onClick={gotoNext} disabled={pageNumber === numberOfPages} />
      </Pagination>
    </>) : (<></>)


  )
  useEffect(() => {
    setPages(pageComponent())
  }, [numberOfPages])
  useEffect(() => {
    if (data && !TotalNoOfPages) {
      console.log("api nahi hai");
      setNumberOfPages(Math.ceil(data.length / limit));
    } else if (data && TotalNoOfPages) {
      console.log("api hai");
      setNumberOfPages(Math.ceil(TotalNoOfPages));
    }
  }, [data, pageNumber, limit, TotalNoOfPages]);


  return {
    pageComponent,
    setNumberOfPages,
    pageNumber,
    Pages,
    limit, setLimit
  }
}

export default UsePagination
