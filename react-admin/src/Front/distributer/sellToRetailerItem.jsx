import React,{ useEffect, useState, useContext, useMemo } from "react";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import "../../style/front/list.scss";
import SellToRetailerItemTable from "./sellToRetailerItemTable";

const SellToRetailerItem = () =>{
    return(
        <div className="new">
        <Sidebar txt={"viewRetailerSellList"} />
        <div className="newContainer">
          <Navbar />
          <SellToRetailerItemTable  />
        </div>
      </div>
    )
}
export default SellToRetailerItem