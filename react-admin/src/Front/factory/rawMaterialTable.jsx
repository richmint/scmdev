import React from "react";
import '../../style/front/viewSupplyTable.scss'
import { rawMaterialSupplierRows , rowMaterialSupplyColumns } from "../../datatablesource";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";




const RawMaterialTable = () =>{
    const navigate = useNavigate();
    const [data,setData] = useState([]);

    useEffect (() =>{
        rawMaterialSupplierRows().then(result => {
            setData(result);
        })
    },[]);

    console.log(data);

    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id));
      };

      const showModel = () =>{
        console.log("Model btn clicked")
      }

      const actionColumn = [
        {
          field: "action",
          headerName: "Action",
          width: 80,
          renderCell: (params) => {
            return (
              <div className="cellAction">
                <div
                  className="deleteButton"
                  onClick={() => navigate('/BuyRawMaterial',{state:{data:params.row}})}
                >
                  Buy
                </div>
              </div>
            );
          },
        },
      ];

      return (
        <div className="datatable">
          <div className="datatableTitle">
            Raw Material for Buy
            <Link to="/" className="link">
              Add New
            </Link> 
          </div>
          {
            data.length > 0 && 
              <DataGrid
                rows={data}
                columns={rowMaterialSupplyColumns.concat(actionColumn)}
                pageSize={9}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[9]}
                checkboxSelection
              />
            }
        </div>
      );
}

export default RawMaterialTable