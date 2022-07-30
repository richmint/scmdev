import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import SpinningWeavingTable from "./spinningWeavingTable";


const SpinningWeaving= () =>{
    return(
        <div className="list">
            <Sidebar txt={"facSpinningWeaving"} />
            <div className="listContainer">
                <Navbar />
                <SpinningWeavingTable />
            </div>
        </div>
    )
}

export default SpinningWeaving
