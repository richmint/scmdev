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

  
  const Supplychain = await ethers.getContractFactory("Supplychain");
  const supplychain = await Supplychain.deploy();
  await supplychain.deployed();
  console.log("Supplychain deployed to:", supplychain.address);

  const DateTime = await ethers.getContractFactory("DateTime");
  const dateTime = await DateTime.deploy();
  await dateTime.deployed();
  console.log("Date deployed at:", dateTime.address);

  // const supplychain =await ethers.getContractAt("Supplychain","0x1d5a9CFCc4d039BF3DA92E9E3151e83F511bBCAf")
  // const dateTime =await ethers.getContractAt("DateTime","0xf41D5f4EA5037B3cb0799BcFb6Ec66be22908311")

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

  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(1,[100,100,100,100,100]);

  // -------------------------  RAW MATERIAL SUPPLIER VIEW BATCHES THAT HE ADDED  -------------------

  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.RawMaterialSupplierID ==rawMaterialSupplierSigner1.address){ 
  //     console.log(); 
  //     console.log(item);  
  //     console.log((await supplychain.RawMaterialDetails(item.supplyChainId)));
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();
  //   } 
  // } 



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
  //     console.log(await supplychain.RawMaterialDetails(item.supplyChainId));
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();  
  //   } 
  // } 


  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(0,[50,50,50,50,50]);
  

  // ---------------------------- FACTORY COMPLETES QUALITY CONTROL FOR RAW MATERILALS ------------------------

  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.itemState ==1 && (item.factoryID1 ==factorySigner1.address || item.factoryID2 ==factorySigner1.address || item.factoryID2 ==factorySigner1.address) ){
      
  //     console.log();
  //     console.log(item); 

  //     console.log(await supplychain.RawMaterialsBoughtByFactory(factorySigner1.address,item.supplyChainId,0));   
  //     console.log(await supplychain.RawMaterialsBoughtByFactory(factorySigner1.address,item.supplyChainId,1));   
  //     console.log(await supplychain.RawMaterialsBoughtByFactory(factorySigner1.address,item.supplyChainId,2));   
  //     console.log(await supplychain.RawMaterialsBoughtByFactory(factorySigner1.address,item.supplyChainId,3));   
  //     console.log(await supplychain.RawMaterialsBoughtByFactory(factorySigner1.address,item.supplyChainId,4));

  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //     console.log();
  //   } 
  // } 

  // ---------------------------- FACTORY RECEIVE RAW MATERIALS ------------------------


  await supplychain.connect(factorySigner1).factoryReceiveRawMaterials(0,warehouseSigner.address);



  // ---------------------------- FACTORY CHECKS THE QUALITY  ------------------------


  await supplychain.connect(factorySigner1).factoryQCRawMaterials(0,[40,40,40,40,40]);

  
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

  // await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(0,100,"Blue","Plain");
  // await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(1,120,"Green","Ruff");
  // await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(2,150,"White","Plain");
  // await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(3,140,"Pink","Ruff");


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

  // await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing(0,10,"Plain Blue T-shirts");
  // await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing(1,12,"Ruff Grean Tank tops");
  // await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing(2,10,"Plain White Tank tops");
  // await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing(3,10,"Ruff Pink Tank tops");

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

  // await supplychain.connect(factorySigner1).factoryQCFinalItems(0,8);
  // await supplychain.connect(factorySigner1).factoryQCFinalItems(1,10);
  // await supplychain.connect(factorySigner1).factoryQCFinalItems(2,8);
  // await supplychain.connect(factorySigner1).factoryQCFinalItems(3,8);

  

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
  
  // await supplychain.connect(factorySigner1).factorySellItemToDistributors(0,distributorSigner1.address);
  // await supplychain.connect(factorySigner1).factorySellItemToDistributors(1,distributorSigner1.address); 
  // await supplychain.connect(factorySigner1).factorySellItemToDistributors(2,distributorSigner1.address);
  // await supplychain.connect(factorySigner1).factorySellItemToDistributors(3,distributorSigner1.address); 



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////             WAREHOUSE            ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
 



  // -----------------------------FOR WAREHOUSE DASHBOARD-------------------------------------


  // let object =await supplychain.getWarehouseItems(warehouseSigner.address)   
  // console.log(object);
  // for(let i=0;i <object.length; i++){
  //   if(object[i].itemState==1){
  //     console.log(object[i]);
  //     console.log("factory bought raw materials")
  //   }else if(object[i].itemState==2){
  //     console.log(object[i])
  //     console.log("factory complete Quality Check")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }else if(object[i].itemState==3){
  //     console.log(object[i])
  //     console.log("factory complete spinning and weaving")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }else if(object[i].itemState==4){
  //     console.log(object[i])
  //     console.log("factory complete garment production")
  //     console.log(await supplychain.OGDetails(object[i].supplyChainId));
  //   }else if(object[i].itemState==5){
  //     console.log(object[i])
  //     console.log("factory complete final quality check")
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
  // await supplychain.connect(distributorSigner1).distributorSellToRetailer(2,[retailerSigner1.address,retailerSigner2.address],[4,4]);
  // await supplychain.connect(distributorSigner1).distributorSellToRetailer(4,[retailerSigner1.address,retailerSigner2.address],[4,4]);

      
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
 

  // ---------------------------- CUSTOMER BUY ITEM LIST  ---------------------------------

  // const total =await supplychain.totalBatchs()
  // for(let i =0; i<total; i++){
  //   let array = await supplychain.getRetailers(i);
  //   if(array.length>0){
  //     for(let k=0; k<array.length; k++){
  //         const object =await supplychain.items(i);
  //         if(object.itemState==7){
  //           console.log(object)
  //           let runits =await supplychain.getRetailersUnits(i)
  //           console.log(runits[k]);
  //           let retailers =await supplychain.getRetailers(i)
  //           console.log(retailers[k]);
  //           // console.log(await supplychain.OGDetails(object.supplyChainId));
  //           const data = await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //           console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //         }
  //      }
  //   }
  // }
  
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
  //   // console.log(await supplychain.OGDetails(info.supplychainID));
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
