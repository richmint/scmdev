import React from 'react';

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { rawMaterialColumns, rawMaterialRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const RawMaterialSupplier = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    rawMaterialRows().then(result=>{
      console.log("Data rawmaterial Table Reuslt = ", result);
      setData(result); 
    })
  },[]);

  const handleDelete = (id) => {
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
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="deleteButton">Delete</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Raw Material Supplier
        <Link to="/admin/rawmaterialsupplier/new" className="link">
          Add New
        </Link>
      </div>
      {
        data.length > 0 && 
          <DataGrid
            className="datagrid"
            rows={data}
            columns={rawMaterialColumns.concat(actionColumn)}
            pageSize={9}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        }
    </div>
  );
};

export default RawMaterialSupplier; 


