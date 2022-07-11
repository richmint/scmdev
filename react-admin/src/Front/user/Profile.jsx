import React, { useState } from "react";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../pages/home/home.scss'
import { Link, useNavigate } from "react-router-dom";

const Profile = () =>{

    const role = localStorage.userRole;
    const email = localStorage.userEmail;

    const Profile = () =>{
        return(
            <div className="profileDiv">
                <div className="innerDiv">
                    <label>Name</label>
                    <text className="txt">Rahul</text>
                </div>
                <div className="innerDiv">
                    <label>Email</label>
                    <text className="txt">{email}</text>
                </div>
                <div className="innerDiv">
                    <label>Role</label>
                    <text className="txt">{role}</text>
                </div>
                    <Link to="/material-supplier">
                        <button className="btn" >Back to Home</button>
                    </Link>
            </div>
        )
    }

    return(
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar/>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <Profile />
                </div>
                
            </div>
        </div>
    )
}

export default Profile