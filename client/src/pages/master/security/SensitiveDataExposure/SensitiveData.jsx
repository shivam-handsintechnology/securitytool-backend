import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import {useSelector} from "react-redux"
import { usePostData, useDataFetch } from "../../../../hooks/DataFetchHook";
import { PaginationComponent } from "../../../../hooks/PaginationComponent";
import LoadingSpinner from "../../../../components/LoaderAndError/loader";
const SensitiveData = () => {
    const [limit, setLimit] = useState(5)
    const [pageNumber, setPageNumber] = useState(1)
    const { type } = useParams()
    const UserData = useSelector((state) => state.UserReducer);
    let columns = [
      // { name: "Id", selector: "_id", sortable: true },
      { name: "Sensitive Data", selector: "sensitivekeys", sortable: true },
      { name: "Domain", selector: "domain", sortable: true },
      // {
      //   name: "Action",
      //   cell: (rowData) => (
      //     <>
      //       <Button
      //         variant="danger acasd mr-1"
      //         onClick={(e) =>alert(rowData._id)}
      //       >
      //         Delete
      //       </Button>
      //     </>
      //   ),
      //   width: "28%",
      // },
    ]
    const sensitiveDataHttp = useDataFetch(`SensitiveDataExposure/sensitive-data?complete=true&limit=${limit}&type=${type}&page=${pageNumber}&domain=${UserData.domain}`, [pageNumber, type])
  console.log(sensitiveDataHttp)
  return (
    <div>
      {/* <Headers />
    <Menu /> */}
      <div>
        {/*CONTENT CONTAINER*/}
        {/*===================================================*/}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 ">
                  <i className="fas fa-align-justify" /> {type == "isBot" ? "Bot" : type == "VPN" ? "Proxy" : type == "Spam" ? "Spam" : type == "SQLI" ? "Sql Injection" : type == "All" ? "All" : ""} Logs
                </h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="dashboard.php">
                      <i className="fas fa-home" /> Admin Panel
                    </a>
                  </li>
                  <li className="breadcrumb-item active">
                    {" "}
                    {type == "isBot" ? "Bot" : type == "VPN" ? "Proxy" : type == "Spam" ? "Spam" : type == "SQLI" ? "Sql Injection" : type == "All" ? "All" : ""} Logs
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        {/*Page content*/}
        {/*===================================================*/}
        <div className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary card-outline">
                  <div className="card-header">
                    <h3 className="card-title heading-title">SQL Injection Logs</h3>
                    {/* <button
                      onClick={() => {
                        deleteAllSqllLogs();
                      }}
                      className="btn btn-flat btn-danger btn-sm float-sm-right p-2" style={{ fontSize: "17px" }}
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Delete all Spammer logs"
                    >
                      <i className="fas fa-trash" /> Delete All
                    </button> */}
                  </div>
                  <div className="card-body ">
                    {
                   sensitiveDataHttp.errors.loading?<LoadingSpinner/>: sensitiveDataHttp.errors.error?<span className="error">{sensitiveDataHttp.errors.message}</span>: sensitiveDataHttp.data && sensitiveDataHttp.data.data &&  sensitiveDataHttp.data.data.length > 0 ? (
                      <div>
                        {/* Render pagination component */}

                        <PaginationComponent
                          columns={columns}
                          data={sensitiveDataHttp.data.data}
                          pageNumber={pageNumber}
                          setPageNumber={setPageNumber}
                          totalPages={sensitiveDataHttp.data.totalPages}
                          showData={true}
                        />
                      </div>
                    ) : (
                      <h1>No Data Found</h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*===================================================*/}
        {/*End page content*/}
      </div>

    </div>
  )
}

export default SensitiveData