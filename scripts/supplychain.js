const {ethers,waffle} = require("hardhat");

async function main() {
  const provider =waffle.provider;
  // Fiber(cotton, linen, jute, silk) --> yarn  
  const [
        adminSigner,
        rawMaterialSupplierSigner1,
        // rawMaterialSupplierSigner2,  
        warehouseSigner, 
        factorySigner1, 
        // factorySigner2, 
        distributorSigner1, 
        distributorSigner2, 
        retailerSigner1, 
        retailerSigner2, 
        customerSigner 
        ] = await ethers.getSigners();

  const SupplyChainToken = await ethers.getContractFactory("SupplyChainToken");
  const supplyChainToken = await SupplyChainToken.deploy();
  await supplyChainToken.deployed();
  console.log("SupplyChainToken deployed to:", supplyChainToken.address);

  const Supplychain = await ethers.getContractFactory("Supplychain");
  const supplychain = await Supplychain.deploy(supplyChainToken.address);
  await supplychain.deployed();
  console.log("Supplychain deployed to:", supplychain.address);

  const DateTime = await ethers.getContractFactory("DateTime");
  const dateTime = await DateTime.deploy();
  await dateTime.deployed();
  console.log("Date deployed at:", dateTime.address);

  // const supplyChainToken = await ethers.getContractAt("SupplyChainToken","0xb57AdBBe690bA8418e53Cc918500cb9233FD23c9")
  // const supplychain =await ethers.getContractAt("Supplychain","0x6C60E1BAc9c8Ef98953BaF5bceF2941FbF547E34")
   

  console.log("Transfering ownership to supplychain contract...");
  await supplyChainToken.transferOwnership(supplychain.address);


  // await supplychain.addRawMaterialSupplier(rawMaterialSupplierSigner1.address);

  // await supplychain.addWarehouse(warehouseSigner.address);
  // await supplychain.addFactory(factorySigner1.address);

  // await supplychain.addDistributor(distributorSigner1.address);
  // await supplychain.addDistributor(distributorSigner2.address);


  // await supplychain.addRetailer(retailerSigner1.address);
  // await supplychain.addRetailer(retailerSigner2.address);



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////       RAW MATERIAL SUPPLIER         ////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////



 
  // ----------------------------  RAW MATERIAL SUPPLIER ADDs A BATCH  ----------------------------

  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(100,110,100);
  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(220,210,200);
  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(300,320,310);
  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(340,430,400);

  // -------------------------  RAW MATERIAL SUPPLIER VIEW BATCHES THAT HE ADDED  -------------------

  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.itemState ==0 && item.RawMaterialSupplierID ==rawMaterialSupplierSigner1.address){ 
  //     console.log();
  //     console.log(item);  
  //     console.log(await supplychain.OGDetails(item.supplyChainId));
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();
  //   } 
  // } 

  // ----------------------------RAW MATERIAL SUPPLIER APPROVE SUPPYTOKEN ------------------------

    
  await supplyChainToken.connect(rawMaterialSupplierSigner1).setApprovalForAll(supplychain.address,true);
  // console.log(await supplyChainToken.isApprovedForAll(rawMaterialSupplierSigner1.address,supplychain.address))
 




////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////             FACTORY            //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
 



  // -------------------------------FACTORY BUY RAW MATERIALS ------------------------------------
  
  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.itemState ==0){
  //     console.log();
  //     console.log(item);  
  //     console.log(await supplychain.OGDetails(item.supplyChainId));
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();
  //   } 
  // } 

  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(0,warehouseSigner.address);
  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(1,warehouseSigner.address);
  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(2,warehouseSigner.address);
  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(3,warehouseSigner.address); 

  

  // ---------------------------- FACTORY APPROVE SUPPYTOKEN ------------------------

  await supplyChainToken.connect(factorySigner1).setApprovalForAll(supplychain.address,true);
  // console.log(await supplyChainToken.isApprovedForAll(factorySigner.address,supplychain.address))
  
  // ---------------------------- FACTORY COMPLETES QUALITY CONTROL FOR RAW MATERILALS ------------------------

  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.itemState ==1 && item.factoryID ==factorySigner1.address){
  //     console.log();
  //     console.log(item);  
  //     console.log(await supplychain.OGDetails(item.supplyChainId));
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();
  //   } 
  // } 

  await supplychain.connect(factorySigner1).factoryQCRawMaterials(0,100,100,100);
  await supplychain.connect(factorySigner1).factoryQCRawMaterials(1,100,100,100);
  await supplychain.connect(factorySigner1).factoryQCRawMaterials(2,100,100,100);
  await supplychain.connect(factorySigner1).factoryQCRawMaterials(3,100,100,100); 
  

  // ---------------------------- FACTORY COMPLETE WEAVING AND SPINNING ------------------------


  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){ 
  //   let object = await supplychain.items(i);
  //     if (2 === object.itemState && object.factoryID ===factorySigner1.address){
  //         console.log();
  //         console.log(object);
  //         console.log(await supplychain.OGDetails(object.supplyChainId));
  //         const data =await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //         console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //         console.log();
  //       }           
  // }    

  await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(0,100,"Blue","Plain");
  await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(1,120,"Green","Ruff");
  await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(2,150,"White","Plain");


  // ---------------------------- FACTORY COMPLETE GARMENT PRODUCTION ------------------------


  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //     if (3 === object.itemState && object.factoryID ===factorySigner1.address){
  //         console.log();
  //         console.log(object);
  //         console.log(await supplychain.OGDetails(object.supplyChainId));
  //         const data =await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //         console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //         console.log();
  //     }    
  // }    

  await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing(0,10,"Plain Blue T-shirts");
  await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing(1,12,"Ruff Grean Tank tops");

  // ---------------------------- FACTORY COMPLETES QUALITY CONTROL FOR FINAL ITEMS ------------------------

  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //     if (4 === object.itemState && object.factoryID ===factorySigner1.address){
  //         console.log();
  //         console.log(object);
  //         console.log(await supplychain.OGDetails(object.supplyChainId));
  //         const data =await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //         console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //         console.log();
  //     }    
  // } 

  await supplychain.connect(factorySigner1).factoryQCFinalItems(0,8);
  await supplychain.connect(factorySigner1).factoryQCFinalItems(1,10);

  

  // ---------------------------- FACTORY SELL TO DISTRIBUTOR --------------------------------

  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //     if (5 === object.itemState && object.factoryID ===factorySigner1.address){
  //         console.log();
  //         console.log(object);
  //         console.log(await supplychain.OGDetails(object.supplyChainId));
  //         const data =await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //         console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //         console.log();
  //     }    
  // }    
  
  await supplychain.connect(factorySigner1).factorySellItemToDistributors(0,distributorSigner1.address);
  await supplychain.connect(factorySigner1).factorySellItemToDistributors(1,distributorSigner1.address); 



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////             WAREHOUSE            ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
 



  // -----------------------------FOR WAREHOUSE DASHBOARD-------------------------------------


  // let object =await supplychain.getWarehouseItems(warehouseSigner.address)   
  // for(let i=0;i <object.length; i++){
  //   if(object[i].itemState==1){
  //     console.log(object[i]);
  //     console.log("factory bought raw materials")
  //   }else if(object[i].itemState==2){
  //     console.log(object[i])
  //     console.log("factory complete weaving and spinning")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }else if(object[i].itemState==3){
  //     console.log(object[i])
  //     console.log("factory complete garment production")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }
  //   const data =await supplychain.timeStamps(object[i].supplyChainId,object[i].itemState);
  //   console.log(await dateTime.getDay(data.toNumber()),".",await dateTime.getMonth(data.toNumber()),".",await dateTime.getYear(data.toNumber()));
  // }

      
  
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////             DISTRIBUTOR            //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
 

  // ---------------------------- DISTRIBUTOR APPROVE SUPPYTOKEN ----------------------------
  
  
  await supplyChainToken.connect(distributorSigner1).setApprovalForAll(supplychain.address,true);


// ------------------------------------  AVAILABLE ITEMS TO SELL -------------------------------


  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //     if (6 === object.itemState && object.distributorId ===distributorSigner1.address){
  //         console.log(object);
  //         console.log(await supplychain.OGDetails(object.supplyChainId));
  //         const data =await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //         console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //     }    
  // }    
  

  // ---------------------------- DISTRIBUTOR SELL TO RETAILER ---------------------------------

  // await supplychain.connect(distributorSigner1).distributorSellToRetailer(0,[retailerSigner1.address,retailerSigner2.address],[4,4]);
  // await supplychain.connect(distributorSigner1).distributorSellToRetailer(1,[retailerSigner1.address,retailerSigner2.address],[5,5]);


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////             RETAILER            ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// 
 

  // const total =await supplychain.totalBatchs()
  // for(let i =0; i<total; i++){
  //   let array = await supplychain.getRetailers(i);
  //   if(array.length>0){
  //     for(let k=0; k<array.length; k++){
  //       if(array[k]===retailerSigner1.address){
  //         const object =await supplychain.items(i);
  //         if(object.itemState==7){
  //           console.log(object)
  //           let runits =await supplychain.getRetailersUnits(i)
  //           console.log(runits[k]); 
  //           let rcounter =await supplychain.getRetailersCounters(i)
  //           console.log(rcounter[k]);
  //           console.log(await supplychain.OGDetails(object.supplyChainId));
  //           const data = await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //           console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //         }
  //       } 
  //     }
  //   }
  // }


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////             CUSTOMER            ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////// 
 


  // await supplychain.connect(customerSigner).customerBuyItem(0,retailerSigner1.address,2);
  // await supplychain.connect(customerSigner).customerBuyItem(0,retailerSigner1.address,1);
  // await supplychain.connect(customerSigner).customerBuyItem(1,retailerSigner2.address,3);


    // ---------------------------- CUSTOMER PROFILE ---------------------------------

  
  // const array = await supplychain.getcustomerSCIds(customerSigner.address)
  // for(let i=0 ; i<array.length; i++){
  //   const info =await supplychain.customerInfo(customerSigner.address,array[i])
  //   const object =await supplychain.items(info.supplychainID);
  //   console.log(info);
  //   console.log(object);
  //   console.log(await supplychain.OGDetails(info.supplychainID));
  //   console.log(info.retailer)
  //   console.log(info.quantity)

  // }

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
