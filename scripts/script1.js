// This script put all roles contract on the development blockchain
const {ethers} = require("hardhat");

async function main() {
  const [
        adminSigner,
        warehouseSigner, 
        factorySigner, 
        ISOSigner, 
        distributorSigner, 
        retailerSigner, 
        customerSigner,
        account1,
        account2,
        account3,
        account4
        ] = await ethers.getSigners();

  console.log("adminSigner address: (Our Blockchain 1'st address)", adminSigner.address);
  console.log("warehouseSigner address: (Our Blockchain 2'nd address)", warehouseSigner.address);
  console.log("factorySigner address: (Our Blockchain 3'rd address)", factorySigner.address);
  console.log("ISOSigner address: (Our Blockchain 4'th address)", ISOSigner.address);
  console.log("distributorSigner address: (Our Blockchain 5'th address)", distributorSigner.address);
  console.log("retailerSigner address: (Our Blockchain 6'th address)", retailerSigner.address);
  console.log("customerSigner address: (Our Blockchain 7'th address)", customerSigner.address);
  console.log();

  const Warehouse = await ethers.getContractFactory("Warehouse");
  const warehouse = await Warehouse.deploy();
  await warehouse.deployed();
  console.log("Warehouse deployed to:", warehouse.address);

  const Factory = await ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();
  await factory.deployed();
  console.log("Factory deployed to:", factory.address);

  const ISO = await ethers.getContractFactory("ISO");
  const iso = await ISO.deploy();
  await iso.deployed();
  console.log("ISO deployed to:", iso.address);

  const Distributor = await ethers.getContractFactory("Distributor");
  const distributor = await Distributor.deploy();
  await distributor.deployed();
  console.log("Distributor deployed to:", distributor.address);

  const Retailer = await ethers.getContractFactory("Retailer");
  const retailer = await Retailer.deploy();
  await retailer.deployed();
  console.log("Retailer deployed to:", retailer.address);

  const Customer = await ethers.getContractFactory("Customer");
  const customer = await Customer.deploy();
  await customer.deployed();
  console.log("Customer deployed to:", customer.address);

  const Supplychain = await ethers.getContractFactory("Supplychain");
  const supplychain = await Supplychain.deploy();
  await supplychain.deployed();
  console.log("Supplychain deployed to:", supplychain.address);


//   Sample script of admin to add remove , list a warehouse 
//   console.log(await supplychain.isWarehouse(warehouseSigner.address));
//   await supplychain.addWarehouse(warehouseSigner.address);
//   console.log(await supplychain.isWarehouse(warehouseSigner.address));
//   console.log("List of all warehouse addresses",await supplychain.getWarehouse());

//   await supplychain.addWarehouse(account1.address);
//   console.log(await supplychain.getWarehouse());

//   await supplychain.removeWarehouse(account1.address);
//   console.log("List of all warehouse addresses",await supplychain.getWarehouse());

//   await supplychain.addWarehouse(account2.address);
//   console.log("List of all warehouse addresses",await supplychain.getWarehouse());

//   await supplychain.connect(account2).removeSelfWarehouse(account2.address);
//   console.log("List of all warehouse addresses",await supplychain.getWarehouse());

    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
