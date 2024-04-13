
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Headers from "./Header";
import Menu from './Menu';
import Footer from './Footer';
const UserLayout = ({ children }) => {
    const statedata = useSelector((state) => state.UserReducer)
    const navigate = useNavigate()
    // useEffect(() => {
    //     statedata.domain == "" && navigate("/Websites")
    // }, [statedata])
    return (
        <React.Fragment>
            <Headers />
            <Menu />
            <div className="content-wrapper">
                {children}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default UserLayout