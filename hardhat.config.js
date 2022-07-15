require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.8",
  networks:{
  localhost: {
    url: "http://127.0.0.1:8545"
  },
  rinkeby: {
    url: "https://rinkeby.infura.io/v3/08d0a9d1045146dc888e62677f83e772", //Infura url with projectId
    accounts: ["bc53a0831c8357fbeb10384caa837e3166823028bac929b15228411ce84772c6","f8cacbe01f31767924507ee018cd506fcbe9a0b17f498645c53111aaa2be3196","b7793769a573e3c9d1163185237e60de34a811de4716deafdb7ce203f3ae587f","88cecca152589d771d750515b4bc98051b34348fd8d81c56c2e56f1d7795c4d7"] // add the account that will deploy the contract (private key)
    // ["RAdmin","RRawMaterialSupplier","RWarehouse","RFactory"]
    } 

  },
  paths:{
    artifacts: './react-admin/src/artifacts',
  }

};

