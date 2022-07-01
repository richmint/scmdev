// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const {ethers} = require("hardhat");

async function main() {
  // const [
  //       adminSigner,
  //       warehouseSigner, 
  //       factorySigner, 
  //       ISOSigner, 
  //       distributorSigner, 
  //       retailerSigner, 
  //       customerSigner
  //       ] = await ethers.getSigners();

  const Warehouse = await ethers.getContractFactory("Warehouse");
  const warehouse = await Warehouse.deploy();
  await warehouse.deployed();
   console.log("Warehouse deployed to:", warehouse.address);

  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.deployed();
  
   console.log("Factory deployed to:", factory.address);

   const RawMaterialSupplier = await ethers.getContractFactory("RawMaterialSupplier");
  const rawMaterialSupplier = await RawMaterialSupplier.deploy();
  await rawMaterialSupplier.deployed();
  
   console.log("Raw Material Supplier deployed to:", rawMaterialSupplier.address);

  // const ISO = await ethers.getContractFactory("ISO");
  // const iso = await ISO.deploy();
  // await iso.deployed();
  //  console.log("ISO deployed to:", iso.address);

  // const Distributor = await ethers.getContractFactory("Distributor");
  // const distributor = await Distributor.deploy();
  // await distributor.deployed();
  //  console.log("Distributor deployed to:", distributor.address);

  // const Retailer = await ethers.getContractFactory("Retailer");
  // const retailer = await Retailer.deploy();
  // await retailer.deployed();
  //  console.log("Retailer deployed to:", retailer.address);

  // const Customer = await ethers.getContractFactory("Customer");
  // const customer = await Customer.deploy();
  // await customer.deployed();
  //  console.log("Customer deployed to:", customer.address);

  // const Supplychain = await ethers.getContractFactory("Supplychain");
  // const supplychain = await Supplychain.deploy();
  // await supplychain.deployed();
  //  console.log("Supplychain deployed to:", supplychain.address);

  // // await warehouse.addWarehouse(account2.address);
  // // await warehouse.addWarehouse(account1.address);
  // // await warehouse.addWarehouse(account2.address);

  // // console.log(await warehouse.getWarehouse());
  // // await warehouse.removeWarehouse(account0.address);
  // // console.log(await warehouse.getWarehouse());

  // console.log(await supplychain.isWarehouse(warehouseSigner.address));
  // await supplychain.addWarehouse(warehouseSigner.address);
  // console.log(await supplychain.isWarehouse(warehouseSigner.address));
  // console.log(await supplychain.getWarehouse());

  // // console.log(await supplychain.removeSelfWarehouse(warehouseSigner.address));
  // // console.log(await supplychain.getWarehouse());

  // // await supplychain.connect(warehouseSigner).removeSelfWarehouse(warehouseSigner.address);
  // // console.log(await supplychain.getWarehouse());
  // console.log(await supplychain.owner());

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
