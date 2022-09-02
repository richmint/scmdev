export const userColumns = [
  // { field: "_id", headerName: "ID", width: 70 },

  {
    field: "name",
    headerName: "User",
    width: 230,
  },
  { 
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {  
    field: "address",
    headerName: "Address",
    width: 230,
  },
  { 
    field: "role",
    headerName: "Role",
    width: 230,
  },
  
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];
export const userRows = async () => {
  return await fetch("http://162.215.222.118:5150/users")
       .then(result=>result.json())
       .then((resp)=> resp)
       .catch((e)=>{
           console.log("error");
           return [];
       });
}; 
export const warehouseColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  { 
    field: "hashAddress",
    headerName: "Hash Address",
    width: 400,
  },
  { 
    field: "name",
    headerName: "Warehouse Name",
    width: 180,
  },
  { 
    field: "email",
    headerName: "Email",
    width: 230,
  },
  { 
    field: "address",
    headerName: "Location",
    width: 250,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
]; 

//temporary data

export const warehouseRows = async () => {
  return await fetch("http://162.215.222.118:5150/warehouse")
       .then(result=>result.json())
       .then((resp)=> resp)
       .catch((e)=>{
           console.log("error");
           return [];
       });
}; 

export const factoryColumns = [
  // { field: "id", headerName: "ID", width: 70 },
 
  { 
    field: "hashAddress",
    headerName: "Hash Address",
    width: 400,
  },
  { 
    field: "name",
    headerName: "Factory Name",
    width: 180,
  },
  { 
    field: "email",
    headerName: "Email",
    width: 230,
  },
  { 
    field: "address",
    headerName: "Location",
    width: 250,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data
export const factoryRows = async () => {
  return await fetch("http://162.215.222.118:5150/factory")
  
       .then(result=>result.json())
       .then((resp)=> resp)
       .catch((e)=>{
           console.log("error");
           return [];
       });
}; 



export const rawMaterialColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  { 
    field: "hashAddress",
    headerName: "Hash Address",
    width: 400,
  },
  { 
    field: "name",
    headerName: "Warehouse Name",
    width: 180,
  },
  { 
    field: "email",
    headerName: "Email",
    width: 230,
  },
  { 
    field: "address",
    headerName: "Location",
    width: 250,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data
export const rawMaterialRows = async () => {
  return await fetch("http://162.215.222.118:5150/rawmaterialsupplier")
       .then(result=>result.json())
       .then((resp)=> resp)
       .catch((e)=>{
           console.log("error");
           return [];
       });
}; 
export const productApproverColumns = [
  // { field: "id", headerName: "ID", width: 70 },

  {
    field: "name",
    headerName: "User",
    width: 230,
  },
  { 
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {  
    field: "address",
    headerName: "Address",
    width: 230,
  },
  { 
    field: "role",
    headerName: "Role",
    width: 150,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data

export const productApproverRows = async () => {
  return await fetch("http://162.215.222.118:5150/productApprover")
       .then(result=>result.json())
       .then((resp)=> resp)
       .catch((e)=>{
           console.log("error");
           return [];
       });
}; 
export const distributerColumns = [
  // { field: "id", headerName: "ID", width: 70 },

  {
    field: "name",
    headerName: "User",
    width: 230,
  },
  { 
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {  
    field: "address",
    headerName: "Address",
    width: 230,
  },
  { 
    field: "role",
    headerName: "Role",
    width: 150,
  },
  
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data

export const distributerRows = async () => {
  return await fetch("http://162.215.222.118:5150/distributer")
       .then(result=>result.json())
       .then((resp)=> resp)
       .catch((e)=>{
           console.log("error");
           return [];
       });
}; 

export const retailerColumns = [
  // { field: "id", headerName: "ID", width: 70 },

  {
    field: "name",
    headerName: "User",
    width: 230,
  },
  { 
    field: "email",
    headerName: "Email",
    width: 230,
  },
  { 
    field: "address",
    headerName: "Address",
    width: 230,
  },
  { 
    field: "role",
    headerName: "Role",
    width: 150,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data
export const retailerRows = async () => {
  return await fetch("http://162.215.222.118:5150/retailer")
       .then(result=>result.json())
       .then((resp)=> resp)
       .catch((e)=>{
           console.log("error");
           return [];
       });
};



export const rowMaterialSupplyColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  { 
    field: "hashAddress",
    headerName: "Hash Address",
    width: 400,
  },
  { 
    field: "name",
    headerName: "Warehouse Name",
    width: 180,
  },
  { 
    field: "email",
    headerName: "Email",
    width: 230,
  },
  { 
    field: "address",
    headerName: "Location",
    width: 250,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

//temporary data
 
export const rawMaterialSupplierRows = async () => {
   return await fetch("http://162.215.222.118:5150/warehouse")
       .then(result=>result.json())
       .then((resp)=> resp)
       .catch((e)=>{
           console.log("error");
           return [];
       });
  
};

export const sellItemColumns = [
  // { field: "id", headerName: "ID", width: 70 },
  { 
    field: "hashAddress",
    headerName: "User ID",
    width: 390,
  },
  { 
    field: "name",
    headerName: "Polyster",
    width: 130,
  },
  { 
    field: "email",
    headerName: "Cotton",
    width: 130,
  },
  { 
    field: "address",
    headerName: "Wool",
    width: 150,
  },
]