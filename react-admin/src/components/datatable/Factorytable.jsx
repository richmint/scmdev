
import React from 'react';

import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { factoryColumns, factoryRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Factorytable = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    factoryRows().then(result=>{
      //console.log("Data Table Reuslt = ", result);
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
            {/* <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div> */}
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Factory
        <Link to="/admin/factory/new" className="link">
          Add New
        </Link>
      </div>
      {
        data.length > 0 && 
          <DataGrid
            className="datagrid"
            rows={data}
            columns={factoryColumns.concat(actionColumn)}
            pageSize={9}
            getRowId={(row) => row._id}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        }
    </div>
  );
};
export default Factorytable;