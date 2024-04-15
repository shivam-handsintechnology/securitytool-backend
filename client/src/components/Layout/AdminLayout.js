import React, { useEffect, useState } from 'react'
import Headers from "./Header";
import Footer from './Footer';
import AdminMenu from './AdminMenu';

const AdminLayout = ({ children }) => {
    return (
        <React.Fragment>
            <Headers />
            <AdminMenu />
            <div className="content-wrapper">
                {children}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default AdminLayout