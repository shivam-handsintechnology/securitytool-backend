import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function UserRegister() {
  const navigate = useNavigate()
  // const history=useNavigate()
  const [email, setemail] = useState("")
  const [password, setPassword] = useState("")
  console.log(email, password)
  const handleSubmit = async () => {
    // eslint-disable-next-line
    if (email == '') {
      toast.error('please enter email')
    }
    // eslint-disable-next-line
    else if (password == '') {
      toast.error("please enter password")
    } else {
      await axios.post(`auth/register`, { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        const { data, message, statusCode } = response
        if (statusCode === 200) {
          toast.success(message)
          navigate('/login')
        } else if (statusCode >= 400) {
          toast.error(message)
        }
      })
        .catch((error) => {
          toast.error(error.response.data)
          console.log(error.response.data)
        })
    }

  }
  return (
    <body class="hold-transition login-page">
      <div className="login-box">
        {/* /.login-logo */}
        <div className="card login-card" >
          <div className="card-body login-card-body">
            <p className="login-box-msg">Register</p>
            <div className="input-group mb-4">
              <input
                type="email"
                className="form-control input-signin"
                value={email}
                onChange={(e) => { setemail(e.target.value) }}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-envelope" />
                </div>
              </div>
            </div>
            <div className="input-group mb-4">
              <input
                type="password"
                className="form-control input-signin"
                value={password}
                onChange={(e) => { setPassword(e.target.value) }}
              />
              <div className="input-group-append">
                <div className="input-group-text">
                  <span className="fas fa-lock" />
                </div>
              </div>
            </div>
            <div className="row">
              {/* <div className="col-8">
                <div className="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
              </div> */}

              <div className="col-12">
                <button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block button-sign">
                  Register
                </button>
              </div>
            </div>


            {/* <p className="mb-1">
              <a href="forgot-password.html">I forgot my password</a>
            </p> */}
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
