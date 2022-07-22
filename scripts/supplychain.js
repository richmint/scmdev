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
        // retailerSigner2, 
        // customerSigner 
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


  await supplychain.addRawMaterialSupplier(rawMaterialSupplierSigner1.address);

  await supplychain.addWarehouse(warehouseSigner.address);
  await supplychain.addFactory(factorySigner1.address);

  await supplychain.addDistributor(distributorSigner1.address);
  await supplychain.addDistributor(distributorSigner2.address);


  await supplychain.addRetailer(retailerSigner1.address);
  // await supplychain.addRetailer(retailerSigner2.address);



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////     RAW MATERIAL SUPPLIER         //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////



 
  // ----------------------------RAW MATERIAL SUPPLIER ADDs A BATCH----------------------------

  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(100,110,100);
  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(220,210,200);
  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(300,320,310);
  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(340,430,400); 

  // ----------------------------RAW MATERIAL SUPPLIER VIEW BATCHES THAT HE ADDED----------------

  // const totalBatchs =await supplychain.totalBatchs()  
  // for(let i= 0; i<totalBatchs; i++){  
  //   const item = await supplychain.items(i);  
  //   if (item.itemState ==0 && item.RawMaterialSupplierID ==rawMaterialSupplierSigner1.address){ 
  //     console.log(item);  
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
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
  //     console.log(item);  
  //     await supplychain.connect(factorySigner1).factoryBuyRawMaterial(item.supplyChainId,warehouseSigner.address,10,10,10);
  //     const object =await supplychain.timeStamps(item.supplyChainId,item.itemState);
  //     console.log(await dateTime.getDay(object.toNumber()),await dateTime.getMonth(object.toNumber()),await dateTime.getYear(object.toNumber()));
  //   } 
  // } 

  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(0,warehouseSigner.address,10,10,10);
  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(1,warehouseSigner.address,20,20,20);
  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(2,warehouseSigner.address,30,30,30);
  await supplychain.connect(factorySigner1).factoryBuyRawMaterial(3,warehouseSigner.address,40,40,40);
  

  // ---------------------------- FACTORY APPROVE SUPPYTOKEN ------------------------

  await supplyChainToken.connect(factorySigner1).setApprovalForAll(supplychain.address,true);
  // console.log(await supplyChainToken.isApprovedForAll(factorySigner.address,supplychain.address))
  

  // ---------------------------- FACTORY COMPLETE WEAVING AND SPINNING ------------------------


  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //     if (1 === object.itemState && object.factoryID ===factorySigner1.address){
  //         console.log(object);
  //         const data =await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //         console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //     }    
  // }    

  await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(0,100,"Blue","Plain");
  await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(1,120,"Green","Ruff");
  await supplychain.connect(factorySigner1).factoryCompleteSpinningWaeving(2,150,"White","Plain");


  // ---------------------------- FACTORY COMPLETE GARMENT PRODUCTION ------------------------


  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //     if (2 === object.itemState && object.factoryID ===factorySigner1.address){
  //         console.log(object);
  //         const data =await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //         console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //     }    
  // }    

  await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing(0,10,"Plain Blue T-shirts");
  await supplychain.connect(factorySigner1).factoryCompleteGarmentManufacturing(1,10,"Ruff Grean Tank tops");


  // ---------------------------- FACTORY SELL TO DISTRIBUTOR --------------------------------

  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //     if (3 === object.itemState && object.factoryID ===factorySigner1.address){
  //         console.log(object);
  //         const data =await supplychain.timeStamps(object.supplyChainId,object.itemState);
  //         console.log(await dateTime.getDay(data.toNumber()),await dateTime.getMonth(data.toNumber()),await dateTime.getYear(data.toNumber()));
  //     }    
  // }    
  
  await supplychain.connect(factorySigner1).factorySellItemToDistributors(0,[distributorSigner1.address,distributorSigner2.address],[5,5]);



////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////             WAREHOUSE            //////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
 



  // -----------------------------FOR WAREHOUSE DASHBOARD-------------------------------------

  // let object =await supplychain.getWarehouseItems(warehouseSigner.address)   
  // for(let i=0;i <object.length; i++){
  //   if(object[i].itemState==1){
  //     console.log(object[i]);
  //     console.log("factory bought raw materials")
  //   }else if(object[i].itemState==2){
  //     console.log(object[i])
  //     console.log("factory complete weaving and spinning")
  //     console.log(await supplychain.YarnDetails(object[i].supplyChainId));
  //   }else if(object[i].itemState==3){
  //     console.log(object[i])
  //     console.log("factory complete garment production")
  //     console.log(await supplychain.YarnDetails(object[i].supplyChainId));
  //   }
  //   const data =await supplychain.timeStamps(object[i].supplyChainId,object[i].itemState);
  //   console.log(await dateTime.getDay(data.toNumber()),".",await dateTime.getMonth(data.toNumber()),".",await dateTime.getYear(data.toNumber()));
  // }

      
  













// --------------------------------------------FOR DISTRIBUTOR -------------------------------------------------





  // console.log(await supplychain.getWarehouseItems(warehouseSigner.address))

  // console.log(await supplychain.items(0))
  // console.log((await supplychain.getDistributors(0)).length);
  // console.log((await supplychain.getDistributors(0)));
  // console.log(await supplychain.getDistributorUnits(0));
  // console.log(await supplychain.getDistributorCounters(0));

  // ------------FOR DISTRIBUTOR VIEW-------------------------
  // const total =await supplychain.totalBatchs()
  // // console.log(total)
  // for(let i =0; i<total; i++){
  //   let array = await supplychain.getDistributors(i);
  //   if(array.length>0){
  //     for(let k=0; k<array.length; k++){
  //       if(array[k]===distributorSigner1.address){
  //         // If this run this mean this distributor is involved in ith batch
  //         // HERE i IS SUPPLY TOKEN ID
  //         console.log(await supplychain.items(i))
  //         let dunits =await supplychain.getDistributorUnits(i)
  //         console.log(dunits[k]);
  //         let dcounter =await supplychain.getDistributorCounters(i)
  //         console.log(dcounter[k]);
  //       }   
  //     }
  //   }
  // }
  // console.log("TOKEN O")
  // console.log(await supplyChainToken.entityMap(2,0,0));
  // console.log(await supplyChainToken.entityMap(2,0,1));
  // console.log(await supplyChainToken.entityMap(2,0,2));
  // console.log("TOKEN 1")
  
  // console.log(await supplyChainToken.entityMap(2,1,0));
  // console.log(await supplyChainToken.entityMap(2,1,1));
  // console.log(await supplyChainToken.entityMap(2,1,2));
  // console.log("TOKEN 2")

  // console.log(await supplyChainToken.entityMap(2,2,0));
  // console.log(await supplyChainToken.entityMap(2,2,1));
  // console.log(await supplyChainToken.entityMap(2,2,2));
  // console.log("TOKEN 3")

  // console.log(await supplyChainToken.entityMap(2,3,0));
  // console.log(await supplyChainToken.entityMap(2,3,1));
  // console.log(await supplyChainToken.entityMap(2,3,2));
  // console.log("TOKEN 4")

  // console.log(await supplyChainToken.entityMap(2,4,0));
  // console.log(await supplyChainToken.entityMap(2,4,1));
  // console.log(await supplyChainToken.entityMap(2,4,2));
  
  // console.log((await supplychain.getDistributors(0)))
  // console.log(await supplychain.getDistributorUnits(0))
  // console.log(await supplychain.getDistributorCounters(0))
  // await supplyChainToken.connect(distributorSigner1).setApprovalForAll(supplychain.address,true);
  // await supplychain.connect(distributorSigner1).distributorSellToRetailer(0);
  // await supplychain.connect(distributorSigner1).distributorSellToRetailer(0,[retailerSigner1.address,retailerSigner2.address],[2,3]);
  // console.log((await supplychain.getDistributors(0)))
  // console.log(await supplychain.getDistributorUnits(0))
  // console.log(await supplychain.getDistributorCounters(0))

  // const total =await supplychain.totalBatchs()
  // console.log(total)
  // for(let i =0; i<total; i++){
  //   let array = await supplychain.getDistributors(i);
  //   if(array.length>0){
  //     for(let k=0; k<array.length; k++){
  //       if(array[k]===distributorSigner1.address){
  //         // If this run this mean this distributor is involved in ith batch
  //         // HERE i IS SUPPLY TOKEN ID
  //         console.log(await supplychain.items(i))
  //         let dunits =await supplychain.getDistributorUnits(i)
  //         console.log(dunits[k]);
  //         let dcounter =await supplychain.getDistributorCounters(i)
  //         console.log(dcounter[k]);
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
