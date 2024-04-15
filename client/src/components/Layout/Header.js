import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../../redux/reducers/UserReducer";
import axios from "axios";

export default function Header(props) {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userreducerDetails = useSelector(state => state.UserReducer)

  const handleLogout = () => {
    sessionStorage.clear()
    dispatch(setUserDetails({ isAuthenticated: false }))
    navigate("/login")
  }

  return (

    <nav className="main-header navbar navbar-expand navbar-white navbar-light" >
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown">
          <a className="nav-link" data-toggle="dropdown" href="#" style={{ paddingTop: '3px' }}>
            <div className="user-panel pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="dist/img/user2-160x160.jpg"
                  className="img-circle elevation-2"
                  alt="User Image"
                  style={{ height: "auto", width: "2.1rem" }}
                />
              </div>
              <div className="info">
                <a href="#" className="d-block" style={{ color: 'rgb(92 92 92)' }}>
                  {userreducerDetails.isAuthenticated && props?.UserData?.email} <i class="fa fa-caret-down" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            {/* <Link to="/Account" className="dropdown-item">
              <i className="fa fa-sign-out" aria-hidden="true" />Account
            </Link> */}
            {userreducerDetails.isAuthenticated ? <a href="#" className="dropdown-item" onClick={handleLogout}>
              <i className="fa fa-sign-out" aria-hidden="true" />Logout
            </a> : <Link to="/login" className="dropdown-item">
              <i className="fa fa-sign-out" aria-hidden="true" />Login
            </Link>}


          </div>
        </li>
      </ul>
    </nav >
  );
}
