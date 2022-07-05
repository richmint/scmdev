// import React from "react";
// import './viewSupplyTable.scss';
// import { DataGrid } from "@mui/x-data-grid";
// import { warehouseColumns,warehouseRows } from "../../datatablesource";
// import { Link } from "react-router-dom";
// import { useEffect,useState } from "react";

// const ViewSupplyTable = () =>{

//     const [data , setData] = useState([]);

//     useEffect(()=>{
//         warehouseRows().then(result=>{
//           //console.log("Data Table Reuslt = ", result);
//           setData(result); 
//         })
//       },[]);
//     // data.map((item,id)=>console.log(item,id));
    

//     // const handleDelete = (id) => {
//     //     setData(data.filter((item) => item.id !== id ));
//     // };

//     const actionColumn = [
//         // console.log("Action column")
//         {
//             field:"action",
//             headerName: "Action",
//             width: 200,
//             renderCell : () =>{
//                 return(
//                     <div className="cellAction">
//                         <Link style={{textDecoration: "none"}} >
//                             <div className="viewButton">View</div>
//                         </Link>
//                         <div className="deleteButton"
//                             >Delete
//                         </div>
//                     </div>
//                 )
//             }
//         }
//     ]



//     return( 
//         <div className="datatable">
//             <div className="datatableTitle">
//                 {/* <Link className="link">Add New</Link> */}
//             </div>
//             {
//                 data.length > 0 &&
//                 <DataGrid
//                     className="datagrid"
//                     rows={data}
//                     columns={warehouseColumns.concat(actionColumn)}
//                     pageSize={9}
//                     getRowId={(row) => row._id}
//                     rowsPerPageOptions={[9]}
//                     checkboxSelection
//                 />
//             }
//         </div>
//     )
// }

// export default ViewSupplyTable



import React from 'react';

import "./viewSupplyTable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { rowMaterialSupplyColumns, rawMaterialSupplierRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const ViewSupplyTable = () => {
  const [data, setData] = useState([]);
 
  useEffect(()=>{
    rawMaterialSupplierRows().then(result=>{
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
            <Link to="/admin/users/test" style={{ textDecoration: "none" }}>
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
        Supply Token List
        {/* <Link to="/admin/warehouse/new" className="link">
          Add New
        </Link> */}
      </div>
      {
        data.length > 0 && 
          <DataGrid
            className="datagrid"
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
};

export default ViewSupplyTable;

