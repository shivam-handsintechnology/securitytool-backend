import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function ApiTesting() {
  const [data, setData] = useState(null)
  const [password, setPassword] = useState()
  const [nosqlData, setnosqlData] = useState("")


  const handleSubmit = async () => {

    let JSONDATA = nosqlData !== '' ? JSON.parse(nosqlData) : ""
    console.log({ JSONDATA })
    await axios.post(`security/test`, { data: password, JSONDATA }).then((response) => {
      const { data, message, statusCode } = response
      console.log({ statusCode })
      if (statusCode === 200) {
        setData(data)
      }
      if (statusCode === 406) {
        setData(data)
        toast.error(message)
      }

    })
      .catch((error) => {
        console.log(error)
        toast.error(error.message)
        console.log(error)
      })


  }
  return (
    <body class="hold-transition login-page login-api-page">
      <div className="login-box">
        <div className="login-logo">
          <a href="../../index2.html">
            <b style={{ color: "black" }}>Admin</b>LTE
          </a>
        </div>
        {/* /.login-logo */}
        <div className="card">
          <div className="card-body login-card-body">
            <p className="login-box-msg">Sign in to start your session</p>


            <div className="input-group mb-4">
              <label className="mr-2 label-text">Normal Input</label>
              <input
                type="text"
                className="form-control"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="input-group ">
              <label className="label-text">NoSql Input</label>
              <input
                type="text"
                className="form-control"
                value={nosqlData}
                onChange={(e) => { setnosqlData(e.target.value) }}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row mt-0">
              <div className="col-8 text-left">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" className="mr-1" />
                  <label htmlFor="remember " className="label-text">Remember Me</label>
                </div>
              </div>
              {/* /.col */}
              <div className="col-4">
                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block button-sign mt-0 p-1">
                  Sign In
                </button>
              </div>
              {/* /.col */}
            </div>
            {JSON.stringify(data)}
            {/* <div className="social-auth-links text-center mb-3">
                <p>- OR -</p>
                <a href="#" className="btn btn-block btn-primary">
                  <i className="fab fa-facebook mr-2" /> Sign in using Facebook
                </a>
                <a href="#" className="btn btn-block btn-danger">
                  <i className="fab fa-google-plus mr-2" /> Sign in using
                  Google+
                </a>
              </div> */}
            {/* /.social-auth-links */}
            <p className="mb-1">
              <a href="forgot-password.html">I forgot my password?</a>
            </p>
            {/* <p className="mb-0">
                <a href="register.html" className="text-center">
                  Register a new membership
                </a>
              </p> */}
          </div>
          {/* /.login-card-body */}
        </div>
      </div>
    </body>
  );

}
