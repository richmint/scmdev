const {ethers,waffle} = require("hardhat");

async function main() {
  const provider =waffle.provider;
  // Fiber(cotton, linen, jute, silk) --> yarn  
  const [
        adminSigner,
        rawMaterialSupplierSigner1,
        rawMaterialSupplierSigner2,  
        warehouseSigner, 
        factorySigner1, 
        factorySigner2, 
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

  // await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(1,[100,100,100,100,100]);
  // await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(2,[120,120,120,120,120]);
  // await supplychain.connect(rawMaterialSupplierSigner2).rawMaterialSupplierSuppliesRM(1,[110,110,110,110,110]);
  
  // await supplychain.connect(factorySigner1).factoryBuyRawMaterial(0,[40,40,40,40,40]);
  // await supplychain.connect(factorySigner2).factoryBuyRawMaterial(0,[30,20,60,20,20]);

  
  // -------------------------  RAW MATERIAL SUPPLIER VIEW BATCHES THAT HE ADDED  -------------------
  

  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i); 
    
  //   if (item.RawMaterialSupplierID ==rawMaterialSupplierSigner1.address){ 

  //     // console.log(item);  
  //     console.log("ORIGNAL RAW MATERIALS THAT THE SUPPLIER UPLOAEDED -");
      
  //     console.log("RAW MATERIAL TYPE-",(await supplychain.RawMaterialDetails(item.supplyChainId)).rawMaterialType.toNumber());
  //     console.log("RAW MATERIAL 1-",(await supplychain.RawMaterialDetails(item.supplyChainId)).rawMaterial1.toNumber());
  //     console.log("RAW MATERIAL 2-",(await supplychain.RawMaterialDetails(item.supplyChainId)).rawMaterial2.toNumber());
  //     console.log("RAW MATERIAL 3-",(await supplychain.RawMaterialDetails(item.supplyChainId)).rawMaterial3.toNumber());
  //     console.log("RAW MATERIAL 4-",(await supplychain.RawMaterialDetails(item.supplyChainId)).rawMaterial4.toNumber());
  //     console.log("RAW MATERIAL 5-",(await supplychain.RawMaterialDetails(item.supplyChainId)).rawMaterial5.toNumber());
      
  //     console.log();
  //     console.log("RAW MATERIALS THAT ARE STILL LEFT TO BE BOUGHT BY THE FACTORIERS  -");

  //     console.log("RAW MATERIAL TYPE-",(await supplychain.RawMaterialSupplierRawMaterial(item.supplyChainId)).rawMaterialType.toNumber());
  //     console.log("RAW MATERIAL 1-",(await supplychain.RawMaterialSupplierRawMaterial(item.supplyChainId)).rawMaterial1.toNumber());
  //     console.log("RAW MATERIAL 2-",(await supplychain.RawMaterialSupplierRawMaterial(item.supplyChainId)).rawMaterial2.toNumber());
  //     console.log("RAW MATERIAL 3-",(await supplychain.RawMaterialSupplierRawMaterial(item.supplyChainId)).rawMaterial3.toNumber());
  //     console.log("RAW MATERIAL 4-",(await supplychain.RawMaterialSupplierRawMaterial(item.supplyChainId)).rawMaterial4.toNumber());
  //     console.log("RAW MATERIAL 5-",(await supplychain.RawMaterialSupplierRawMaterial(item.supplyChainId)).rawMaterial5.toNumber());
      
  //     console.log();

  //     console.log("Date");
  //     console.log(await dateTime.getDay(item.timeStamp0.toNumber()),await dateTime.getMonth(item.timeStamp0.toNumber()),await dateTime.getYear(item.timeStamp0.toNumber()));
  //     console.log();
  //     console.log("Time"); 
  //     console.log(await dateTime.getHour(item.timeStamp0.toNumber()),await dateTime.getMinute(item.timeStamp0.toNumber()),await dateTime.getSecond(item.timeStamp0.toNumber()));
      
  //     console.log("FACTORY WHO BOUGHT THESE RAW MATERIAL DETAILS :")
  //     let j=1;
  //     while(j){
  //       try {          
  //         const data =await supplychain.IdToFactory(item.supplyChainId,j-1);
  //         // console.log(data);
          
  //         console.log();
  //         console.log("Factory address :", data.factory); 
  //         console.log();

  //         console.log("Date at which the factory bought raw materials");
  //         console.log(await dateTime.getDay(data.timeStamp1.toNumber()),await dateTime.getMonth(data.timeStamp1.toNumber()),await dateTime.getYear(data.timeStamp1.toNumber()));
          
  //         console.log();
          
  //         console.log("Time which the factory bought raw materials"); 
  //         console.log(await dateTime.getHour(data.timeStamp1.toNumber()),await dateTime.getMinute(data.timeStamp1.toNumber()),await dateTime.getSecond(data.timeStamp1.toNumber()));
          
  //         // const data2 =await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)
  //         // console.log(data2);
  //         console.log();

  //         console.log("RAW MATERIAL TYPE BOUGHT BY FACTORY-",(await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)).rawMaterialType.toNumber());
  //         console.log("RAW MATERIAL 1 BOUGHT BY FACTORY-",(await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)).rawMaterial1.toNumber());
  //         console.log("RAW MATERIAL 2 BOUGHT BY FACTORY-",(await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)).rawMaterial2.toNumber());
  //         console.log("RAW MATERIAL 3 BOUGHT BY FACTORY-",(await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)).rawMaterial3.toNumber());
  //         console.log("RAW MATERIAL 4 BOUGHT BY FACTORY-",(await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)).rawMaterial4.toNumber());
  //         console.log("RAW MATERIAL 5 BOUGHT BY FACTORY-",(await supplychain.FactoryRawMaterialsORIGIONAL(item.supplyChainId,data.factory)).rawMaterial5.toNumber());
          
  //         j++;
  //       } catch (error) {
  //         break;
  //       }
  //     }
    // } 
  // } 



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////             FACTORY            //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
 



  // -------------------------------FACTORY BUY RAW MATERIALS ------------------------------------
  // -------------------- ALL BATCHES UPLOADED BY RAW MATERIAL SUPPLIERS ----------------------


  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   // if (){ 

  //     console.log(item);  
  //     console.log(await supplychain.RawMaterialSupplierRawMaterial(item.supplyChainId));  
      
  //     console.log("Date");
  //     console.log(await dateTime.getDay(item.timeStamp0.toNumber()),await dateTime.getMonth(item.timeStamp0.toNumber()),await dateTime.getYear(item.timeStamp0.toNumber()));
  //     console.log("Time"); 
      
  //     let hour =await dateTime.getHour(item.timeStamp0.toNumber())
  //     let minute =await dateTime.getMinute(item.timeStamp0.toNumber());
  //     let second =await dateTime.getSecond(item.timeStamp0.toNumber());

  //     if(hour+5>24){
  //       hour = ((hour+5) -24);
  //     }else{
  //       hour +=5;
  //     }
  //     if(minute+35> 60){
  //       hour++;
  //       minute = ((minute+35)-60);
  //     }else{
  //       minute=minute+35;
  //     }
  //     console.log(hour,minute,second);
      
  //   // } 
  // } 


  
  // await supplychain.connect(factorySigner1).factoryBuyRawMaterial(0,[40,40,40,40,40]);
  // await supplychain.connect(factorySigner1).factoryBuyRawMaterial(1,[50,50,50,50,50]);


  // --------------------------- FACTORY AFTER BUYING A BATCH OF RAW MATERIALS --------------------


  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   let j=1;
  //   while(j){
  //     try {
  //       const data =await supplychain.IdToFactory(i,j-1);
  //       const item =await supplychain.items(i);
  //       if(data.factory==factorySigner1.address && data.itemState==0){
  //         console.log(data);
  //         console.log(item);  
  //         console.log(await supplychain.FactoryRawMaterialsORIGIONAL(i,factorySigner1.address));
  //       }
  //       j++; 
  //     } catch (error) {
  //       break;
  //     }
  //   }
  // }
  

  // ---------------------------- FACTORY RECEIVE RAW MATERIALS ------------------------


  // await supplychain.connect(factorySigner1).factoryReceiveRawMaterials(0,warehouseSigner.address);
  // await supplychain.connect(factorySigner1).factoryReceiveRawMaterials(1,warehouseSigner.address);


  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   let j=1;
  //   while(j){
  //     try {
  //       const data =await supplychain.IdToFactory(i,j-1);
  //       const item =await supplychain.items(i);
  //       if(data.factory==factorySigner1.address && data.itemState ==1){
  //         console.log(data);
  //         console.log(item);  
  //         // console.log(await supplychain.FactoryRawMaterialsORIGIONAL(i,factorySigner1.address));
  //       }
  //       j++; 
  //     } catch (error) {
  //       break;
  //     }
  //   }
  // }


  
  
  // ---------------------------- FACTORY COMPLETES QUALITY CONTROL FOR RAW MATERILALS ------------------------


  // await supplychain.connect(factorySigner1).factoryQCRawMaterials(0,[28,30,40,18,14]);
  // await supplychain.connect(factorySigner1).factoryQCRawMaterials(1,[20,20,20,20,20]);


  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   let j=1;
  //   while(j){
  //     try {
  //       const data =await supplychain.IdToFactory(i,j-1);
  //       const item =await supplychain.items(i);
  //       if(data.factory==factorySigner1.address && data.itemState ==2){
  //         console.log(data);
  //         console.log(item);  
          
  //         console.log("Original raw materials.")
  //         console.log(await supplychain.FactoryRawMaterialsORIGIONAL(i,factorySigner1.address));

  //         console.log("Raw materials after quality control.")
  //         console.log(await supplychain.FactoryRawMaterialsAferQC(i,factorySigner1.address));
  //       }
  //       j++; 
  //     } catch (error) {
  //       break;
  //     }
  //   }
  // }

   
  // ---------------------------- FACTORY COMPLETE WEAVING AND SPINNING ------------------------

  // await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(0,100,"Blue","Plain");
  // await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(0,120,"Green","Ruff");


  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   let j=1;
  //   while(j){
  //     try {
  //       const data =await supplychain.IdToFactory(i,j-1);
  //       const item =await supplychain.items(i);
  //       if(data.factory==factorySigner1.address && data.itemState ==3){
  //         console.log(data);
  //         console.log(item);  
  
  //         console.log("Raw materials after quality control.")
  //         console.log(await supplychain.FactoryRawMaterialsAferQC(i,factorySigner1.address));
  //       }
  //       j++; 
  //     } catch (error) {
  //       break;
  //     }
  //   }
  // }


  
  // ---------------------------- FACTORY COMPLETE GARMENT PRODUCTION ------------------------


  // await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing([0,1],140,"Plain Blue T-shirts");


  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.factory ==factorySigner1.address && data.productState==0){
  //     console.log(data);

  //     let j=1;
  //     while(j){
  //       try {
  //         const supplychainID =await supplychain.ProductIds(i,j-1);
  //         console.log(supplychainID);
  //         console.log(await supplychain.items(supplychainID));
  //         j++; 
  //       } catch (error) {
  //         break;
  //       }
  //     }
  //   }
  // }


  // ---------------------------- FACTORY COMPLETES QUALITY CONTROL FOR FINAL ITEMS ------------------------


  // await supplychain.connect(factorySigner1).factoryQCFinalItems(0,130);
  
  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.factory ==factorySigner1.address && data.productState==1 ){
  //     console.log(data);

  //     let j=1;
  //     while(j){
  //       try {
  //         const supplychainID =await supplychain.ProductIds(i,j-1);
  //         console.log(supplychainID);
  //         console.log(await supplychain.items(supplychainID));
  //         j++; 
  //       } catch (error) {
  //         break;
  //       }
  //     }
  //   }
  // }





  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////             WAREHOUSE            //////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////
  
  



  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   let j=1;
  //   while(j){
  //     try {
  //       const data =await supplychain.IdToFactory(i,j-1);
  //       const item =await supplychain.items(i);
  //       if(data.warehouse ==warehouseSigner.address ){
          
  //         console.log(data);
  //         console.log(item);  
          
  //         console.log("Original raw materials.")
  //         console.log(await supplychain.FactoryRawMaterialsORIGIONAL(i,data.factory));

  //         console.log("Raw materials after quality control.")
  //         console.log(await supplychain.FactoryRawMaterialsAferQC(i,data.factory));
  //       }
  //       j++; 
  //     } catch (error) {
  //       break;
  //     }
  //   }
  // }















//          completed











  // console.log(await supplychain.ProductIds(0,0));
  // console.log(await supplychain.ProductIds(0,1));

  // console.log(await supplychain.items(0));

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
