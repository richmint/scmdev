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
        customerSigner1, 
        customerSigner2 
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
  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(2,[120,120,120,120,120]);
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
  // -------------------- ALL BATCHES UPLOADED BY RAW MATERIAL SUPPLIERS ------------------------


  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   let j=1;
  //   let flag=true;
  //   while(j){
  //     try {
  //       const data =await supplychain.IdToFactory(i,j-1);
  //       if(data.factory==factorySigner1.address){
  //         flag=false;
  //       }
  //       j++; 
  //     } catch (error) {
  //       break;
  //     }
  //   }
  //   if(flag){
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
  //   } 
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
  //         console.log("Warehouse :",data.warehouse);
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
  // await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(1,120,"Green","Ruff");


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

  // ------ VIEW OF MANUFACTURED PRODUCTS ------

  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.factory ==factorySigner1.address && data.productState==0){
  //     console.log(data);
  //     // This data is for ith product


  //     // This loop is for the batches that this product is made up of.
  //     let j=1;
  //     while(j){
  //       try {
  //         const supplychainID =await supplychain.ProductIds(i,j-1);
  //         console.log(supplychainID);
  //         console.log(await supplychain.items(supplychainID));
          


  //         // ---- Run this loop for factory related details of this batch i.e. warehouse address, timestamps etc.

  //         // let k=1;
  //         // while(k){
  //         //   try {
  //         //     const data =await supplychain.IdToFactory(supplychainID,k-1);
  //         //     if(data.factory == factorySigner1.address){
  //         //       console.log(data);
  //         //     }
  //         //     k++; 
  //         //   } catch (error) {
  //         //     break;
  //         //   }
  //         // }

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
  //   if(data.factory ==factorySigner1.address && data.productState==1 && data.leftUnits>0){
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

  
  // ------------------------ FACTORY SELLS PRODUCT BATCH (PARTIAL OR COMPLETE )TO A DISTRIBUTORS  ------------------------


  // await supplychain.connect(factorySigner1).factorySellItemToDistributor(0,distributorSigner1.address,40);
  // await supplychain.connect(factorySigner1).factorySellItemToDistributor(0,distributorSigner2.address,50);
  
  

  // ----------------- FACTORY VIEW OF WHICH PRODUCT BATCH HE HAS SENT TO WHICH DISTRIBUTOR --------------


  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.factory ==factorySigner1.address && data.productState==1 ){
      
  //     if(data.leftUnits>0){
  //       console.log(data);
  //       // This data is about i th product
  //       let j=1;
  //       while(j){
  //         try {
  //           const data =await supplychain.ProductIdToDistributor(i,j-1);
  //           console.log(data);
  //           console.log("TimeStamp when factory sell to this distributor is :", data.timeStamp8);
  //           // This data is about i th product distributors

  //           j++; 
  //         } catch (error) {
  //           break;
  //         } 
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




  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////             DISTRIBUTOR            //////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////
  




// ------------------ DISTBIBUTOR VIEW WHEN THE FACTORY SHIPS A PRODUCT BATCH ---------------------------


  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.productState==1 ){
  //     console.log(data);

  //     // let k=1;
  //     // while(k){
  //     //   try {
  //     //     const supplychainID =await supplychain.ProductIds(i,k-1);
  //     //     console.log(supplychainID);
  //     //     console.log(await supplychain.items(supplychainID));
          
  //     //     // ---- Run this loop for factory related details of this batch i.e. warehouse address, timestamps etc.

  //     //     // let l=1;
  //     //     // while(l){
  //     //     //   try {
  //     //     //     const data2 =await supplychain.IdToFactory(supplychainID,l-1);
  //     //     //     if(data2.factory == data.factory){
  //     //     //       console.log(data2);
  //     //     //       break;
  //     //     //     }
  //     //     //     l++; 
  //     //     //   } catch (error) {
  //     //     //     break;
  //     //     //   }
  //     //     // }

  //     //     k++; 
  //     //   } catch (error) {
  //     //     break;
  //     //   }
  //     // }

  //     let j=1;
  //     while(j){
  //       try {
  //         const data =await supplychain.ProductIdToDistributor(i,j-1);
  //         if(data.distributor ==distributorSigner1.address && data.distributorState==0){
  //           console.log(data);
  //           console.log("TimeStamp when factory sell to this distributor is :", data.timeStamp8);
  //           // This data is about i th product distributors
  //         }
  //         j++; 
  //       } catch (error) {
  //         break;
  //       }
  //     }
  //   }
  // }


// ----------------------------- DISTBIBUTOR RECEIVES THE PRODUCT BATCH ---------------------------

 
  // await supplychain.connect(distributorSigner1).distributorReceivesProductBatch(0);


  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.productState==1 ){
  //     console.log(data);

  //     let j=1;
  //     while(j){
  //       try {
  //         const data =await supplychain.ProductIdToDistributor(i,j-1);
  //         if(data.distributor ==distributorSigner1.address && data.distributorState==1){
  //           console.log(data);
  //           console.log("TimeStamp when factory sell to this distributor is :", data.timeStamp9);
  //           // This data is about i th product distributors
  //         }
  //         j++; 
  //       } catch (error) {
  //         break;
  //       }
  //     }
  //   }
  // }

  // ----------------------------- DISTBIBUTOR SELL TO A RETAILER  ---------------------------

  // await supplychain.connect(distributorSigner1).distributorSellsToRetailer(0,retailerSigner1.address,35);
  // await supplychain.connect(distributorSigner1).distributorSellsToRetailer(0,retailerSigner2.address,5);


  // ----------------- DISTRIBUTOR VIEW OF WHICH PRODUCT BATCH HE HAS SENT TO WHICH RETAILER --------------
  

  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.productState==1 ){
  //     // console.log(data);
  //     // This data is about i th product
      
  //     let j=1;
  //     while(j){
  //       try {
  //         const data =await supplychain.ProductIdToRetailer(i,j-1);
  //         if(data.distributor==distributorSigner1.address){
  //           console.log(data); 
  //         }
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
  ///////////////////////////////             RETAILER            //////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////////////////////////////////
  

// ------------------ RETAILER VIEW WHEN THE DISTRIBUTOR SHIPS A PRODUCT BATCH ---------------------------


  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.productState==1 ){
  //     // console.log(data);

  //     // let k=1;
  //     // while(k){
  //     //   try {
  //     //     const supplychainID =await supplychain.ProductIds(i,k-1);
  //     //     console.log(supplychainID);
  //     //     console.log(await supplychain.items(supplychainID));
          
  //     //     // ---- Run this loop for factory related details of this batch i.e. warehouse address, timestamps etc.

  //     //     // let l=1;
  //     //     // while(l){
  //     //     //   try {
  //     //     //     const data2 =await supplychain.IdToFactory(supplychainID,l-1);
  //     //     //     if(data2.factory == data.factory){
  //     //     //       console.log(data2);
  //     //     //       break;
  //     //     //     }
  //     //     //     l++; 
  //     //     //   } catch (error) {
  //     //     //     break;
  //     //     //   }
  //     //     // }

  //     //     k++; 
  //     //   } catch (error) {
  //     //     break;
  //     //   }
  //     // }

  //     let j=1;
  //     while(j){
  //       try {
  //         const data =await supplychain.ProductIdToRetailer(i,j-1);
  //         if(data.retailer ==retailerSigner1.address && data.retailerState==0){
  //           console.log(data); 
  //         }
  //         j++; 
  //       } catch (error) {
  //         break;
  //       }
  //     }
  //   }
  // }
 
  

  // ----------------------------- RETAILER RECEIVES THE PRODUCT BATCH ---------------------------


  // await supplychain.connect(retailerSigner1).retailerReceivesProductBatch(0);


  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.productState==1 ){
  //     console.log(data);

  //     let j=1;
  //     while(j){
  //       try {
  //         const data =await supplychain.ProductIdToRetailer(i,j-1);
  //         if(data.retailer ==retailerSigner1.address && data.retailerState==1){
  //           console.log(data);
  //         }
  //         j++; 
  //       } catch (error) {
  //         break;
  //       }
  //     }
  //   } 
  // }



  // ------------------------------- RETAILER SELL TO A CUSTOMER  ---------------------------

  // await supplychain.connect(retailerSigner1).retailerSellToCustomer(0,customerSigner1.address,2);
  // await supplychain.connect(retailerSigner1).retailerSellToCustomer(0,customerSigner2.address,3);


  // ----------------- RETAILER VIEW OF WHICH PRODUCT BATCH HE HAS SENT TO WHICH CUSTOMER --------------
  

  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.productState==1 ){
  //     // console.log(data);
  //     // This data is about i th product
        
  //     let j=1;
  //     while(j){
  //       try {
  //         const data =await supplychain.ProductIdToCustomer(i,j-1);
  //         if(data.retailer==retailerSigner1.address){
  //           console.log(data); 
  //         }
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
  ///////////////////////////////             CUSTOMER            ////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////


  // ----------------- CUSTOMER VIEW OF WHICH PRODUCT PRODUCT HE HAS BOUGHT ---------------------
   
  // const totalBatches =await supplychain.totalProductBatchs();
  // for(let i=0; i<totalBatches; i++){
  //   const data =await supplychain.Product(i);
  //   if(data.productState==1 ){
  //     // console.log(data);
  //     // This data is about i th product
      
  //     let j=1;
  //     while(j){
  //       try {
          
  //         const data2 =await supplychain.ProductIdToCustomer(i,j-1);


  //         if(data2.customer==customerSigner1.address){
  //           // Details of this product
  //           console.log(data);

  //           // Details related to product and customer
  //           console.log(data2);  


  //           // This loop is for the batches this product is made up of. batch -0 and batch -1 details
  //           let k=1;
  //           while(k){
  //             try {
  //               const supplychianId =await supplychain.ProductIds(i,k-1);
  //               // console.log(supplychianId);
  //               const itemData =(await supplychain.items(supplychianId));
  //               console.log(itemData);
  //               // Raw materal details for this batch original
  //               // console.log(await supplychain.RawMaterialDetails(supplychianId));

  //               // This loop is for the factory details (only run once)
  //               let j=1;
  //               while(j){
  //                 try {
  //                   const data3 =await supplychain.IdToFactory(supplychianId,j-1);
  //                   if(data3.factory==data.factory ){
  //                     console.log(data3);
  //                     console.log("Warehouse :",data3.warehouse); 
  //                     console.log(await supplychain.FactoryRawMaterialsAferQC(supplychianId,data.factory));
  //                   }
  //                   j++; 
  //                 } catch (error) {
  //                   break;
  //                 }
  //               }

  //               k++;
  //             } catch (error) {
  //               break;;
  //             }
  //           }
          
  //         }
          
  //         j++; 
  //       } catch (error) {
  //         break;
  //       }
  //     }
  //   }
  // }
  

}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });