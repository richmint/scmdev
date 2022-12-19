import React from "react";
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import '../../style/front/list.scss'
import QrCode from "./qrCode";
const ViewRecordOnQrCode = () =>{
    return(
        <div className="list">
            <Sidebar txt={"qrcode"} />
            <div className="listContainer">
                <Navbar />
                <QrCode />
            </div>
        </div> 
    )
}
export default ViewRecordOnQrCode