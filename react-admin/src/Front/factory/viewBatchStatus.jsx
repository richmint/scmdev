import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import ViewBatchStatusTable from "./viewBatchStatusTable";


const ViewBatchStatus = () =>{
    return(
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <ViewBatchStatusTable />
            </div>
        </div>
    )
}

export default ViewBatchStatus
