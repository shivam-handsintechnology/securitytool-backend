import React, { Component } from "react";
import Headers from "../Header";
import Menu from "../Menu";
import Footer from "../Footer";
import { Link } from "react-router-dom";

export default class Account extends Component {

    render() {
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
                                        <i className="fas fa-user" /> Account
                                    </h1>
                                </div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item">
                                            <Link to="/">
                                                <i className="fas fa-home" /> Admin Panel
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">Account</li>
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
                                    <form className="form-horizontal" action="" method="post">
                                        <div className="card card-primary card-outline">
                                            <div className="card-header">
                                                <h3 className="card-title">Account</h3>
                                            </div>
                                            <div className="card-body">
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-user" /> Username:{" "}
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="username"
                                                        className="form-control"
                                                        defaultValue="admin"
                                                        required=""
                                                    />
                                                </div>
                                                <hr />
                                                <div className="form-group">
                                                    <label className="control-label">
                                                        <i className="fas fa-key" /> New Password:{" "}
                                                    </label>
                                                    <input type="text" name="password" className="form-control" />
                                                </div>
                                                <i>Fill this field only if you want to change the password.</i>
                                            </div>
                                            <div className="card-footer row">
                                                <div className="col-md-8">
                                                    <button
                                                        className="btn btn-block btn-flat btn-success"
                                                        name="edit"
                                                        type="submit"
                                                    >
                                                        <i className="fas fa-save" /> Save
                                                    </button>
                                                </div>
                                                <div className="col-md-4">
                                                    <button
                                                        type="reset"
                                                        className="btn btn-block btn-flat btn-default"
                                                    >
                                                        <i className="fas fa-undo" /> Reset
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*===================================================*/}
                    {/*End page content*/}
                </div>


            </div>
        );
    }
}
