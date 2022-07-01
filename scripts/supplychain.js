const {ethers} = require("hardhat");

async function main() {
  const [
        adminSigner,
        rawMaterialSupplierSigner,
        warehouseSigner, 
        factorySigner, 
        ISOSigner, 
        distributorSigner, 
        retailerSigner, 
        customerSigner
        ] = await ethers.getSigners();
  const RawMaterialSupplier = await ethers.getContractFactory("RawMaterialSupplier");
  const rawMaterialSupplier = await RawMaterialSupplier.deploy();
  await rawMaterialSupplier.deployed();
  console.log("RawMaterialSupplier deployed to:", rawMaterialSupplier.address);

  const SupplyChainToken = await ethers.getContractFactory("SupplyChainToken");
  const supplyChainToken = await SupplyChainToken.deploy();
  await supplyChainToken.deployed();
  console.log("SupplyChainToken deployed to:", supplyChainToken.address);

  const Supplychain = await ethers.getContractFactory("Supplychain");
  const supplychain = await Supplychain.deploy(supplyChainToken.address);
  await supplychain.deployed();
  console.log("Supplychain deployed to:", supplychain.address);

  // console.log("SupplychainToken owner: ",await supplyChainToken.owner());  
  console.log("Transfering ownership to supplychain contract...");
  await supplyChainToken.transferOwnership(supplychain.address);
  // console.log("SupplychainToken owner: ",await supplyChainToken.owner());  

  console.log("Adding a RawMaterialSupplier...");
  // console.log(await supplychain.isRawMaterialSupplier(rawMaterialSupplierSigner.address))
  await supplychain.addRawMaterialSupplier(rawMaterialSupplierSigner.address);
  // console.log(await supplychain.isRawMaterialSupplier(rawMaterialSupplierSigner.address))

  console.log("Adding a Warehouse Admin ...");
  await supplychain.addWarehouse(warehouseSigner.address);

  console.log("Adding a FactoryAdmin...");
  // console.log(await supplychain.isFactory(factorySigner.address))
  await supplychain.addFactory(factorySigner.address);
  // console.log(await supplychain.isFactory(factorySigner.address))

  const tx =await supplychain.connect(rawMaterialSupplierSigner).rawMaterialSupplierSuppliesRM(2,3,2);
  // console.log((await tx.wait()).events[1]);
  await tx.wait();
  // console.log(await supplychain.items(0));

  // console.log(await supplyChainToken.balanceOf(adminSigner.address,0));
  // console.log(await supplyChainToken.totalSupply(0));
  // console.log(await supplyChainToken.balanceOf(rawMaterialSupplierSigner.address,0));

  // console.log(await supplyChainToken.isApprovedForAll(rawMaterialSupplierSigner.address,supplychain.address))
  await supplyChainToken.connect(rawMaterialSupplierSigner).setApprovalForAll(supplychain.address,true);
  // console.log(await supplyChainToken.isApprovedForAll(rawMaterialSupplierSigner.address,supplychain.address))

  const tx2 = await supplychain.connect(factorySigner).factoryBuyRawMaterial(0,warehouseSigner.address);
  // console.log((await tx2.wait()).events[1]);
  await tx2.wait();

  // console.log(await supplychain.items(0));
  // console.log(await supplychain.wareHouseItems(warehouseSigner.address,0))
  // console.log(await supplyChainToken.entityMap(0,0));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
