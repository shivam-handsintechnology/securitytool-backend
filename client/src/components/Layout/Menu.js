import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import data from "../../helpers/dashboard"
export default function Menu(props) {
  const userreducerDetails = useSelector((state) => state.UserReducer)
  const [isSubMenuOpen, setIsSubMenuOpen] = useState([
    // {name:"whiteList",isOpen:false},
    // {name:"logs",isOpen:false},
    // {name:"bans",isOpen:false}

  ]);

  const toggleSubMenu = (name) => {
    let temp = [...isSubMenuOpen];
    temp.map((item)=>{
      if(item.name === name){
        item.isOpen = !item.isOpen;
      }
    })
    setIsSubMenuOpen(temp);
    
  };
  const isOpen = (name) => {
   let isOpen = false;
   isSubMenuOpen.find((item)=>{
      if(item.name === name){
        isOpen = item.isOpen;
      }
    })
    return isOpen;
  };
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
            <li className="nav-item ">
              <Link to="/dashboard" className="nav-link ">
                <i className="fas fa-info-circle" />&nbsp; <p>Dashboard</p>
              </Link>
            </li>
            <li  className={`nav-item ${isOpen("whiteList") ? 'menu-open' : ''}`}>
              <a href="#" className="nav-link" onClick={()=>toggleSubMenu("whiteList")}>
                <i className="fas fa-flag" />&nbsp; <p>Whitelist <i className="fas fa-angle-right right" />
                </p></a>
              <ul className="nav nav-treeview">
                <li className="nav-item "><Link to="/Ipwhitelist" className="nav-link "><i className="fas fa-user" />&nbsp; <p>IP Whitelist</p></Link></li>
                <li className="nav-item "><Link to="/Blacklist" className="nav-link "><i className="far fa-file-alt" />&nbsp; <p>File Whitelist</p></Link></li>
              </ul>
            </li>
            <li className="nav-header">SECURITY</li>
            <li  className={`nav-item ${isOpen("logs") ? 'menu-open' : ''}`}>
              <a href="#" className="nav-link " onClick={()=>toggleSubMenu("logs")}>
                <i className="fas fa-align-justify" />&nbsp; <p>Logs <i className="fas fa-angle-right right" />
                </p></a>
              <ul className="nav nav-treeview">
                <li className="nav-item "><Link to="/logs/SQLI" className="nav-link "><i className="fas fa-code" />&nbsp; <p>SQLi Logs <span className="badge right badge-info">0</span></p></Link></li>
                <li className="nav-item "><Link to="/logs/isBot" className="nav-link "><i className="fas fa-robot" />&nbsp; <p>Bad Bot Logs <span className="badge right badge-danger">0</span></p></Link></li>
                <li className="nav-item "><Link to="/logs/VPN" className="nav-link "><i className="fas fa-globe" />&nbsp; <p>Proxy Logs <span className="badge right badge-success">0</span></p></Link></li>
                <li className="nav-item "><Link to="/logs/Spam" className="nav-link "><i className="fas fa-keyboard" />&nbsp; <p>Spam Logs <span className="badge right badge-warning">0</span></p></Link></li>
              </ul>
            </li>
            <li  className={`nav-item ${isOpen("bans") ? 'menu-open' : ''}`}>
              <a  className="nav-link " onClick={()=>toggleSubMenu("bans")}>
                <i className="fas fa-ban" />&nbsp; <p>Bans <i className="fas fa-angle-right right" />
                </p></a>
              <ul className="nav nav-treeview">
                <li className="nav-item "><Link to="/Blacklist" className="nav-link "><i className="fas fa-user" />&nbsp; <p>IP Bans <span className="badge right badge-secondary">0</span></p></Link></li>
              </ul>
            </li>

            <li className="nav-header">TOOLS</li>
            {data.map((category, index) => (
              <li key={index} className={`nav-item ${isOpen(`category-${index}`) ? 'menu-open' : ''}`}>
               {
                category.link? <Link to={`${category.link}`} className="nav-link">
                <i className="fas fa-flag" />&nbsp; <p>{category.Category} <i className="fas fa-angle-right right" /></p>
              </Link> :<Link  className="nav-link" onClick={() => toggleSubMenu(`category-${index}`)}>
                  <i className="fas fa-flag" />&nbsp; <p>{category.Category} <i className="fas fa-angle-right right" /></p>
                </Link>
               }
                
                <ul className="nav nav-treeview">
                  {category.UseCases.map((useCase, i) => (
                    <li key={i} className="nav-item">
                      <Link to={`${useCase.link}`} className="nav-link">
                        <i className="far fa-file-alt" />&nbsp; <p>{useCase.label}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}

          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
