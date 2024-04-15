import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Menu(props) {
  const userreducerDetails = useSelector((state) => state.UserReducer)
  console.log("userreducerDetails", userreducerDetails)
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="/" className="brand-link">
        <img
          src="http://handsintechnology.in/1assets/images/bg/shapes/logo12.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: "1" }}
        />
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              {userreducerDetails.isAuthenticated && userreducerDetails?.email}
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar nav-legacy flex-column" data-widget="treeview" role="menu">
            <li className="nav-header">NAVIGATION</li>
            <li className="nav-item active">
              <Link to="/Websites" className="nav-link">
                <i className="fas fa-home" />&nbsp; <p>Websites</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/Systeminfo" className="nav-link ">
                <i className="fas fa-info-circle" />&nbsp; <p>System Information</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/SSLInformation" className="nav-link ">
                <i className="fas fa-user-secret" />&nbsp; <p>SSL Information</p>
              </Link>
            </li>
            <li className="nav-item has-treeview ">
              <Link to={"/Ipwhitelist"} className="nav-link ">
                <i className="fas fa-flag" />&nbsp; <p>Whitelist <i className="fas fa-angle-right right" />
                </p></Link>
              <ul className="nav nav-treeview">
                <li className="nav-item "><Link to="/Ipwhitelist" className="nav-link "><i className="fas fa-user" />&nbsp; <p>IP Whitelist</p></Link></li>
                <li className="nav-item "><Link to="/Blacklist" className="nav-link "><i className="far fa-file-alt" />&nbsp; <p>Ip BlackList</p></Link></li>
              </ul>
            </li>
            {/* <li className="nav-item ">
              <Link to="/Warningpages" className="nav-link ">
                <i className="fas fa-file-alt" />&nbsp; <p>Warning Pages</p>
              </Link>
            </li> */}
            {/* <li className="nav-item ">
              <Link to="/Loginsecurity" className="nav-link ">
                <i className="fas fa-history" />&nbsp; <p>Login History</p>
              </Link>
            </li> */}
            <li className="nav-header">SECURITY</li>
            <li className="nav-item has-treeview ">
              <a href="#" className="nav-link ">
                <i className="fas fa-align-justify" />&nbsp; <p>Logs <i className="fas fa-angle-right right" />
                </p></a>
              <ul className="nav nav-treeview">
                <li className="nav-item "><Link to="/logs/SQLI" className="nav-link "><i className="fas fa-code" />&nbsp; <p>SQLi Logs <span className="badge right badge-info">0</span></p></Link></li>
                <li className="nav-item "><Link to="/logs/isBot" className="nav-link "><i className="fas fa-robot" />&nbsp; <p>Bad Bot Logs <span className="badge right badge-danger">0</span></p></Link></li>
                <li className="nav-item "><Link to="/logs/VPN" className="nav-link "><i className="fas fa-globe" />&nbsp; <p>Proxy Logs <span className="badge right badge-success">0</span></p></Link></li>
                <li className="nav-item "><Link to="/logs/Spam" className="nav-link "><i className="fas fa-keyboard" />&nbsp; <p>Spam Logs <span className="badge right badge-warning">0</span></p></Link></li>
              </ul>
            </li>
            <li className="nav-item has-treeview ">
              <Link to={"/Blacklist"} className="nav-link ">
                <i className="fas fa-ban" />&nbsp; <p>Bans <i className="fas fa-angle-right right" />
                </p></Link>
              <ul className="nav nav-treeview">
                <li className="nav-item "><Link to="/Bansip" className="nav-link "><i className="fas fa-user" />&nbsp; <p>IP Bans <span className="badge right badge-secondary">0</span></p></Link></li>
                <li className="nav-item "><Link to="/Banscountry" className="nav-link "><i className="fas fa-globe" />&nbsp; <p>Country Bans <span className="badge right badge-secondary">0</span></p></Link></li>
                <li className="nav-item "><Link to="/Bansiprange" className="nav-link "><i className="fas fa-grip-horizontal" />&nbsp; <p>IP Range Bans <span className="badge right badge-secondary">0</span></p></Link></li>
                <li className="nav-item "><Link to="/Otherbans" className="nav-link "><i className="fas fa-desktop" />&nbsp; <p>Other Bans <span className="badge right badge-secondary">0</span></p></Link></li>
              </ul>
            </li>

            <li className="nav-header">TOOLS</li>
            <li className="nav-item ">
              <Link to="/Errormonitoring" className="nav-link ">
                <i className="fas fa-exclamation-circle" />&nbsp; <p>Error Monitoring</p>
              </Link>
            </li>
            <li className="nav-item ">
              <Link to="/socketchecker" className="nav-link ">
                <i className="fas fa-exclamation-circle" />&nbsp; <p>Validation Monitoring</p>
              </Link>
            </li>


            <li className="nav-item ">
              <Link to="/Portscanner" className="nav-link ">
                <i className="fas fa-search" />&nbsp; <p>Port Scanner</p>
              </Link>
            </li>

          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
