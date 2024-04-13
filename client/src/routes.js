
// import Systeminfo from "./pages/master/security/Systeminfo";
// import Loginsecurity from "./pages/master/security/Loginsecurity";
// import Portscanner from "./pages/master/security/Portscanner";
// import Htaccesseditor from "./pages/master/security/Htaccesseditor";
// import Errormonitoring from "./pages/master/security/Errormonitoring";
// import Visitanalytics from "./pages/master/security/Visitanalytics";
// import Livetraffic from "./pages/master/security/Livetraffic";
// import Badwords from "./pages/master/security/Badwords";
// import Badbots from "./pages/master/security/Badbots";
// import Proxy from "./pages/master/security/Proxy";
// import Spam from "./pages/master/security/Spam";
// import Alllogs from "./pages/master/security/Alllogs";
// import Badbotlogs from "./pages/master/security/Badbotlogs";
// import Bansip from "./pages/master/security/Bansip";
// import Banscountry from "./pages/master/security/Banscountry";
// import Bansiprange from "./pages/master/security/Bansiprange";
// import Otherbans from "./pages/master/security/Otherbans";
// import Warningpages from './pages/master/security/Warningpages';
// import ApiTesting from './pages/login/ApiTesting';
// import BadPoxylogs from './pages/master/security/BadbProxyogs';
// import SpamLogs from './pages/master/security/Spamlogs';
// import SocketChecker from './pages/master/security/SocketChecker';
// import HashGenerator from './pages/master/security/HashGenrator';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { decryptData } from './helpers/commonFunctions';
import UserRegister from './pages/login/UserRegister';
import Layout from './components/Layout/Layout';
import Ipwhitelist from "./pages/master/security/Ipwhitelist";
import Blacklist from "./pages/master/security/Blacklist";
import Visitordetails from "./pages/master/security/Visitordetails";
import Block from "./pages/master/Block";
import UserLogin from "./pages/login/UserLogin";
import SSLInformation from './pages/master/security/SSLInformation';
import ErrorPageHandler from './pages/ErrorPageHandler';
// import SessionInfo from './pages/master/security/SessionInfo';
import AllWebsites from './pages/master/security/AllWebsite';
import AllLogs from './pages/master/security/Alllogs';
import Dashboard from "./pages/master/security/Dashboard";
import Main from './pages/master/Main';
import SensitiveData from './pages/master/security/SensitiveDataExposure/SensitiveData';

export const ProtectedRoutes = [


  {
    path: '/',
    exact: true,
    element: <Main />,
    Layout: "AdminLayout"

  },
  {
    path: '/dashboard',
    exact: true,
    element: <Main />,
    Layout: "AdminLayout"

  },
  {
    path: '/SSLInformation',
    exact: true,
    element: <SSLInformation />,
    Layout: "AdminLayout"
  },
 
  {
    path: '/block',
    exact: true,
    element: <Block />,
    Layout: "AdminLayout"
  },
  {
    path: '/Ipwhitelist',
    exact: true,
    Layout: "AdminLayout",
    element: <Ipwhitelist />,
  },
  {
    path: '/Blacklist',
    exact: true,
    Layout: "AdminLayout",
    element: <Blacklist />,
  },
  {
    path: '/Visitordetails/:ip',
    exact: true,
    Layout: "AdminLayout",
    element: <Visitordetails />,
  },
  {
    path: '/logs/:type',
    exact: true,
    Layout: "AdminLayout",
    element: <AllLogs />,
  },
  {
    path: '/SensitiveData/:type',
    exact: true,
    Layout: "AdminLayout",
    element: <SensitiveData />,
  },
  {
    path: 'Websites',
    exact: true,
    Layout: "AdminLayout",
    element: <AllWebsites />,
  },
    // {
  //   path: '/sessioninfo',
  //   exact: true,
  //   element: <SessionInfo />,
  //   Layout: "AdminLayout"
  // },
    // {
  //   path: '/hashgenerater',
  //   exact: true,
  //   element: <HashGenerator />,
  //   Layout: "AdminLayout"
  // },
  // {
  //   path: '/Systeminfo',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Systeminfo />,
  // },
  // {
  //   path: '/Loginsecurity',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Loginsecurity />,
  // },
  // {
  //   path: '/Warningpages',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Warningpages />,
  // },

  
  // {
  //   path: '/socketchecker',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <SocketChecker />,
  // },
 
  // {
  //   path: '/Portscanner',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Portscanner />,
  // },
  // {
  //   path: '/Htaccesseditor',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Htaccesseditor />,
  // },
  // {
  //   path: '/Errormonitoring',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Errormonitoring />,
  // },
  // {
  //   path: '/Visitanalytics',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Visitanalytics />,
  // },
  // {
  //   path: '/Livetraffic',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Livetraffic />,
  // },
 
  // {
  //   path: '/Badwords',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Badwords />,
  // },
  // {
  //   path: '/Badbots',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Badbots />,
  // },
  // {
  //   path: '/Proxy',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Proxy />,
  // },
  // {
  //   path: '/Spam',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Spam />,
  // },
  // {
  //   path: '/Alllogs',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Alllogs />,
  // },

  // {
  //   path: '/Badbotlogs',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Badbotlogs />,
  // },
  // {
  //   path: '/Proxylogs',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <BadPoxylogs />,
  // },
  // {
  //   path: '/Spammerlogs',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <SpamLogs />,
  // },
  // {
  //   path: '/Bansip',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Bansip />,
  // },
  // {
  //   path: '/Banscountry',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Banscountry />,
  // },
  // {
  //   path: '/Bansiprange',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Bansiprange />,
  // },
  // {
  //   path: '/Otherbans',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <Otherbans />,
  // },

  // {
  //   path: 'apitest',
  //   exact: true,
  //   Layout: "AdminLayout",
  //   element: <ApiTesting />,
  // },
];
const PublicRoutes = [
  {
    path: '/login',
    exact: true,
    element: <UserLogin />,
  },
  {
    path: '/register',
    exact: true,
    element: <UserRegister />,
  },
  {
    path: '*',
    exact: true,
    element: <ErrorPageHandler />,
  },
];




export const RoutePages = () => {
  const userreducerDetails = useSelector((state) => state.UserReducer)
  const [Loader, setLoding] = useState(true)

  useEffect(() => {
    setLoding(true)
    const encrypteddata = sessionStorage.getItem('token') ? decryptData(sessionStorage.getItem('token')) : ''
    if (userreducerDetails.isAuthenticated && encrypteddata.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + encrypteddata.token
      axios.defaults.headers.common['SelectedHost'] = userreducerDetails.domain
    }

    setLoding(false)


  }, [userreducerDetails,])


  return (
    <React.Fragment>{Loader ? <div >..Loading</div> :
      <Router>
        <Routes>
          
          {
            PublicRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))
          }
          {
          ProtectedRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={userreducerDetails.isAuthenticated ? <Layout>{route.element}</Layout>
                : <Navigate to="/login" />}
            />
          ))}
        </Routes>


      </Router>
    }</React.Fragment>

  );
};

