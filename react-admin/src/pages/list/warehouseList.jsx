import React from 'react';

import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Warehousetable from "../../components/datatable/warehousetable"

const WarehouseList = () => { 
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Warehousetable/>
      </div>
    </div>
  )
}

export default WarehouseList