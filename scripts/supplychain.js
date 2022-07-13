const {ethers,waffle} = require("hardhat");

async function main() {
  const provider =waffle.provider;
  const [
        adminSigner,
        rawMaterialSupplierSigner1,
        // rawMaterialSupplierSigner2,  
        warehouseSigner, 
        factorySigner, 
        distributorSigner1, 
        distributorSigner2, 
        // retailerSigner1, 
        // retailerSigner2, 
        // customerSigner
        ] = await ethers.getSigners();
  // const RawMaterialSupplier = await ethers.getContractFactory("RawMaterialSupplier");
  // const rawMaterialSupplier = await RawMaterialSupplier.deploy();
  // await rawMaterialSupplier.deployed();
  // console.log("RawMaterialSupplier deployed to:", rawMaterialSupplier.address);

  const SupplyChainToken = await ethers.getContractFactory("SupplyChainToken");
  const supplyChainToken = await SupplyChainToken.deploy();
  await supplyChainToken.deployed();
  console.log("SupplyChainToken deployed to:", supplyChainToken.address);

  const Supplychain = await ethers.getContractFactory("Supplychain");
  const supplychain = await Supplychain.deploy(supplyChainToken.address);
  await supplychain.deployed();
  console.log("Supplychain deployed to:", supplychain.address);

  // const supplyChainToken = await ethers.getContractAt("SupplyChainToken","0x93871CCdF4e3f3b4c6EF761c44E5C1Ad6192D93c")
  // const supplychain =await ethers.getContractAt("Supplychain","0x735916bB171DBB995937Bddc16f7142daB0c84D1")

  // console.log(await provider.getBalance(adminSigner.address))
  // console.log(await provider.getBalance(rawMaterialSupplierSigner1.address))

  // console.log("SupplychainToken owner: ",await supplyChainToken.owner());  
  console.log("Transfering ownership to supplychain contract...");
  await supplyChainToken.transferOwnership(supplychain.address);
  // console.log("SupplychainToken owner: ",await supplyChainToken.owner());  
 
  // console.log("Adding a RawMaterialSupplier...");
  // console.log(await supplychain.isRawMaterialSupplier(rawMaterialSupplierSigner1.address))
  await supplychain.addRawMaterialSupplier("0x70997970c51812dc3a010c7d01b50e0d17dc79c8");
  // await supplychain.addRawMaterialSupplier(rawMaterialSupplierSigner2.address);
  // console.log(await supplychain.isRawMaterialSupplier("0x70997970c51812dc3a010c7d01b50e0d17dc79c8"))

  // console.log("Adding a Warehouse Admin ...");
   await supplychain.addWarehouse(warehouseSigner.address);

  // console.log("Adding a FactoryAdmin...");
  // console.log(await supplychain.isFactory(factorySigner.address))
   await supplychain.addFactory(factorySigner.address);

  // console.log(await supplychain.isFactory(factorySigner.address))
  // console.log("Adding a Distributor Admins...");
  await supplychain.addDistributor(distributorSigner1.address);
  await supplychain.addDistributor(distributorSigner2.address);

  // console.log("Adding a Retailer Admins...");
  // await supplychain.addRetailer(retailerSigner1.address);
  // await supplychain.addRetailer(retailerSigner2.address);

  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(100,110,100);
  await supplychain.connect(rawMaterialSupplierSigner1).rawMaterialSupplierSuppliesRM(220,210,200);
  // await supplychain.connect(rawMaterialSupplierSigner2).rawMaterialSupplierSuppliesRM(3,3,3);
  // await supplychain.connect(rawMaterialSupplierSigner2).rawMaterialSupplierSuppliesRM(4,4,4); 

  // console.log((await tx.wait()).events[1]);
  
  // console.log(await supplychain.items(0));
  // console.log(await supplychain.items(1));
  // console.log(await supplychain.items(2));
  // console.log(await supplychain.items(3)); 

  // console.log(await supplyChainToken.totalNFT());
  // console.log(await supplyChainToken.getMySupplyTokens(rawMaterialSupplierSigner1.address));
  // console.log(await supplyChainToken.getMySupplyTokens(rawMaterialSupplierSigner2.address));
  // console.log(await supplychain.totalBatchs())

  // FOR RAW MATERIAL SUPPLIER DASHBOARD

  // let count =await supplyChainToken.getMySupplyTokens(rawMaterialSupplierSigner1.address);
  // for (let i=0; i<count.length ; i++){
  //   let object = await supplychain.items(i);
  //   if (rawMaterialSupplierSigner1.address === object.RawMaterialSupplierID && object.itemState ===0){
  //       console.log(object)
  //   }
  // }


  // console.log(await supplyChainToken.entityMap(0,0,0));
  // console.log(await supplyChainToken.entityMap(0,1,0));

  // console.log(await supplyChainToken.balanceOf(adminSigner.address,0));
  // console.log(await supplyChainToken.totalSupply(0));
  // console.log(await supplyChainToken.balanceOf(rawMaterialSupplierSigner1.address,0));
 
  // console.log(await supplyChainToken.isApprovedForAll(rawMaterialSupplierSigner1.address,supplychain.address))
  await supplyChainToken.connect(rawMaterialSupplierSigner1).setApprovalForAll(supplychain.address,true);
  // await supplyChainToken.connect(rawMaterialSupplierSigner2).setApprovalForAll(supplychain.address,true);
  // console.log(await supplyChainToken.isApprovedForAll(rawMaterialSupplierSigner1.address,supplychain.address))

  // FOR FACTORY DASHBOARD (AVAILABLE TO BUY)
  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //   if (0 === object.itemState){
  //       console.log(object)
  //   }
  // }

  await supplychain.connect(factorySigner).factoryBuyRawMaterial(0,warehouseSigner.address);
  // await supplychain.connect(factorySigner).factoryBuyRawMaterial(1,warehouseSigner.address);

  // FOR RAW MATERIAL SUPPLIER DASHBOARD (UPDATED AFTER FACTORY BOUGHT A BATCH)

  // let count =await supplyChainToken.getMySupplyTokens(rawMaterialSupplierSigner1.address);
  // for (let i=0; i<count.length ; i++){
  //   let object = await supplychain.items(i);
  //   if (rawMaterialSupplierSigner1.address === object.RawMaterialSupplierID && object.itemState ===0){
  //       console.log(object)
  //   }
  // }

  //  -/-/-/-/-/-/-/-/-/-/-/-/-/--FOR WAREHOUSE -/-/-/-/-/-/--/-/-/-/-/-/-/-/-/-/-/

  // let object =await supplychain.getWarehouseItems(warehouseSigner.address)
  // for(let i=0;i <object.length; i++){
  //   if(object[i].itemState==1){
  //     console.log(object[i]);
  //   }
  // }
  // Check the itemState in the returned array, if it is 1 then show this on wareshouseSigner frontend


      
  // FOR FACTORY DASHBOARD (SELL TO TO DISTRIBUTOR) 
  // let count =await supplychain.totalBatchs();
  // for (let i=0; i<count ; i++){
  //   let object = await supplychain.items(i);
  //     if (1 === object.itemState && object.factoryID ===factorySigner.address){
  //         console.log(object)
  //     }
  // }

  // console.log((await tx2.wait()).events[1]);
  // console.log("FIRST TOKEN")
  // console.log(await supplyChainToken.entityMap(0,0,0));
  // console.log(await supplyChainToken.entityMap(0,0,1));
  // console.log("SECOND TOKEN")
  // console.log(await supplyChainToken.entityMap(1,0,0));
  // console.log("THIRD TOKEN")
  // console.log(await supplyChainToken.entityMap(2,0,0));
  // console.log(await supplyChainToken.entityMap(2,0,1));


  await supplyChainToken.connect(factorySigner).setApprovalForAll(supplychain.address,true);
  // console.log(await supplyChainToken.isApprovedForAll(factorySigner.address,supplychain.address))
  
  
  // console.log(await supplyChainToken.balanceOf(factorySigner.address,0));
  // console.log(await supplyChainToken.balanceOf(distributorSigner1.address,0));
  // console.log(await supplyChainToken.balanceOf(distributorSigner2.address,0));
  // console.log(await supplyChainToken.totalSupply(0));
  const tx3 = await supplychain.connect(factorySigner).factorySellItemToDistributors(0,10,[distributorSigner1.address,distributorSigner2.address],[5,5]);
  await tx3.wait();
  // console.log(await supplychain.getWarehouseItems(warehouseSigner.address))

  // console.log(await supplychain.items(0))
  // console.log((await supplychain.getDistributors(0)).length);
  // console.log((await supplychain.getDistributors(0)));
  // console.log(await supplychain.getDistributorUnits(0));
  // console.log(await supplychain.getDistributorCounters(0));

  // ------------FOR DISTRIBUTOR VIEW-------------------------
  const total =await supplychain.totalBatchs()
  // console.log(total)
  for(let i =0; i<total; i++){
    let array = await supplychain.getDistributors(i);
    if(array.length>0){
      for(let k=0; k<array.length; k++){
        if(array[k]===distributorSigner1.address){
          // HERE i IS SUPPLY TOKEN ID
          console.log(await supplychain.items(i))
          let dunits =await supplychain.getDistributorUnits(i)
          console.log(dunits[k]);
          let dcounter =await supplychain.getDistributorCounters(i)
          console.log(dcounter[k]);
        }   
      }
    }
  }
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
  
  // console.log(await supplychain.getDistributors(2))
  // await supplyChainToken.connect(distributorSigner1).setApprovalForAll(supplychain.address,true);
  // const tx4 =await supplychain.connect(distributorSigner1).distributorSellToRetailer(2,[retailerSigner1.address,retailerSigner1.address],[2,3]);
  // console.log((await tx4.wait()).events[0].args)
  // console.log(await supplychain.getDistributors(2))
  // retailerSigner1
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
