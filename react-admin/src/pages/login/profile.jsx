import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import '../home/home.scss'
import { Link } from "react-router-dom";


const ProfileAdmin = () =>{

    const Profile = () =>{
        return(
            <div className="profileDiv" >
                <div className="innerDiv">
                    <label>Name</label>
                    <text className="txt" >Example1</text>
                </div>
                <div className="innerDiv">
                    <label>Email</label>
                    <text className="txt">Example</text>
                </div>
                <div className="innerDiv">
                    <label>Role</label>
                    <text className="txt">Example</text>
                </div>
                <Link to="/admin/home">
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

export default ProfileAdmin