import React from "react";
// import Headers from "../../../components/Layout/Header";
// import Menu from "../../../components/Layout/Menu";
// import Footer from "../../../components/Layout/Footer";
// import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

import mockdata from "../../MOCK_DATA.json"
import UseCustomTable from "../../utils/DataTable";
const Insecuredirect = () => {
  const { type } = useParams()
  const [data, setData] = useState([...mockdata]);
  const [iparray, setIparray] = useState([]);
  const [isApiCall, setisAPiCall] = useState(null)
  const [NoOfPagesFromApi, setNumberOfPagesFromAPi] = useState(null);

  async function AddIpaddres(body) {
    await axios
      .post(`security/ip/blacklist/add`, body)
      .then((response) => {
        toast.success(response.message);
        return response;
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  async function deleteAllSqllLogs() {
    await axios
      .post(`security/sqllogs/deleteall`, { ip: iparray })
      .then((response) => {
        setisAPiCall(response.data)
        toast.success(response.message);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
  function deleteSingleSqllLogs(body) {
    axios
      .post(`security/sqllogs/deletesingle`, body)
      .then((response) => {
        const { message, statusCode } = response;
        if (statusCode === 200) {
          setisAPiCall(response.data)
          toast.success(message);
        }
      })
      .catch((error) => {
        const { message } = error;
        toast.error(message);
      });
  }
  let columns = [
    { name: "Id", selector: "_id", sortable: true },
    { name: "Ip", selector: "ip", sortable: true },
    { name: "Browser", selector: "browser", sortable: true },
    { name: "Country", selector: "country", sortable: true },
    { name: "Date", selector: "date" },
    { name: "Os", selector: "os" },
    {
      name: "Action",
      cell: (rowData) => (
        <>
          <Link to={`/Visitordetails/${rowData.ip}`} className="btn btn-success mr-1">
            Details
          </Link>

          <Button
            variant="danger acasd mr-1"
            onClick={() => deleteSingleSqllLogs({ ip: rowData.ip })}
          >
            Delete
          </Button>


          <Button
            variant="btn btn-primary acasd"
            onClick={() => {
              AddIpaddres({ ip: rowData.ip });
              getAllSqllLogs();
            }}
          >
            Add To Black List
          </Button>

        </>
      ),
      width: "28%",
    },
  ];
  const { table, pageNumber, limit, setLimit } = UseCustomTable(columns, data, NoOfPagesFromApi)
  const getAllSqllLogs = async () => {
    await axios
      .get(`security/sqllogs?limit=${limit}&&type=${type}&page=${pageNumber}`)
      .then((response) => {
        const { data } = response;
        let ArrayOfdta = [];
        setData(data.data);
        setNumberOfPagesFromAPi(data.totalPages)
        data.data.map((value) => {
          setIparray(value.ip);

        });


      })
      .catch((error) => {
        console.log(error);
      });
  };

  const history = useNavigate();
  useEffect(() => {
    getAllSqllLogs();
  }, [isApiCall, pageNumber, type]);




  console.log("pageNumber>>>>>>>>>>>>", pageNumber)

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
                    <button
                      onClick={() => {
                        deleteAllSqllLogs();
                      }}
                      className="btn btn-flat btn-danger btn-sm float-sm-right p-2" style={{ fontSize: "17px" }}
                      data-toggle="tooltip"
                      title=""
                      data-original-title="Delete all Spammer logs"
                    >
                      <i className="fas fa-trash" /> Delete All
                    </button>
                  </div>
                  <div className="card-body ">
                    {
                      table
                    }
                    {/* <CustomTable
                    
                    /> */}
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
  );
};

export default Insecuredirect;
