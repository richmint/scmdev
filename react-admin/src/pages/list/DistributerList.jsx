import React from 'react';

import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Distributertable from "../../components/datatable/Distributertable"

const DistributerList = () => { 
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Distributertable/>
      </div>
    </div>
  )
}

export default DistributerList