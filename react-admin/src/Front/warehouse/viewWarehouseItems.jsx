import React from 'react'
import Navbar from "../../components/front_navbar/Navbar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import './list.scss'
import ViewSupplyTable from './viewSupplyTable'



const ViewSupplyToken = () =>{
    return(
        <div className='list'>
            <Sidebar txt={"WareSuplyToken"} />
            <div className='listContainer'>
                <Navbar />
                <ViewSupplyTable />
            </div>
        </div>
    ) 
}
 
export default ViewSupplyToken