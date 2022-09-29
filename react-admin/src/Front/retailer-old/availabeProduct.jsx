import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import AvailabeProductTable from "./availabeProductTable";


const ManufactureGarment= () =>{
    return(
        <div className="list">
            <Sidebar txt={"avlprodretailer"} />
            <div className="listContainer">
                <Navbar />
                <AvailabeProductTable />
            </div>
        </div>
    )
}

export default ManufactureGarment
