import React, { useRef } from "react";
import '../../style/front/viewSupplyTable.scss'
import { rawMaterialSupplierRows , sellItemColumns } from "../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";





const SellItemTable = () =>{
    const [data,setData] = useState([]);
    const [model, setModel] = useState(false);
    const navigate = useNavigate();

    useEffect (() =>{
        rawMaterialSupplierRows().then(result => {
            setData(result);
        })
    },[]);

    console.log("Data is ",data)

    console.log(data);

    const sendData = (id) => {
        setData(data.filter((item) => item.id !== id));
      };

    const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 200,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <div
                  className="deleteButton"
                  onClick={() => sendData(params.row._id)}
                >
                  Supply Token ID
                </div>
                <div
                  className="deleteButton"
                  onClick={() => {navigate("/SellItemFormData",{state:{data:params.row}})}}
                >
                    Sell
                </div>
              </div>
            );
          },
        },
      ];

  
    
      return (
        <div className="datatable">
           
          <div className="datatableTitle">
            Sell Item To Distributer
            <Link to="/" className="link">
              Add New
            </Link> 
          </div>
          {
            data.length > 0 && 
              <DataGrid
                className="datagrid"
                rows={data}
                columns={sellItemColumns.concat(actionColumn)}
                pageSize={9}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[9]}
                checkboxSelection
              />
            }
        </div>
      );
}

export default SellItemTable
