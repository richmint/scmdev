import React from "react";
// import Sidebar from "../../components/sidebar/Sidebar";
import Sidebar from "../../components/front_sidebar/Sidebar";
import Navbar from "../../components/front_navbar/Navbar";
import '../../style/front/list.scss'
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ViewSpinningMaterial= () =>{
    let data = useLocation();
    console.log("Coming data is ",data.state.polysteramount);
//  console.log(({fialpolamount}));
    return(
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Card style={{ width: '80rem' }}>
                    <Card.Body>
                        <Card.Title>Spinning Material Detail</Card.Title>
                        <Card.Text>
                        {/* <p><b>Batch ID : </b></p>
                        <p><b>Raw Material Supplier : </b> {data.state.RawMaterialSupplierID}</p>
                        <p><b>Warehouse Address : </b> {data.state.warehouseID}</p>
                        <p><b>Polyster Amount : </b> {data.state.polysteramount }</p>
                        <p><b>Cotton Amount : </b> {data.state.CottonAmount}</p>
                        <p><b>Wool Amount : </b> {data.state.WoolAmount}</p>
                        <p><b>Raw Material Supplier : </b> {data.state.RawMaterialSupplierID}</p>
                        <p><b>Raw Material Supplier : </b> {data.state.RawMaterialSupplierID}</p>
                        <p><b>Raw Material Supplier : </b> {data.state.RawMaterialSupplierID}</p>
                        <p><b>Raw Material Supplier : </b> {data.state.RawMaterialSupplierID}</p>
                        <p><b>Raw Material Supplier : </b> {data.state.RawMaterialSupplierID}</p> */}
                        </Card.Text>
                        </Card.Body>
                    </Card>
            </div>
        </div>
    )
}

export default ViewSpinningMaterial
