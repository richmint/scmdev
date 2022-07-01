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
    url: "https://speedy-nodes-nyc.moralis.io/3b50a8f528f7397fd9f310cf/eth/rinkeby", //Infura url with projectId
    accounts: ["88cecca152589d771d750515b4bc98051b34348fd8d81c56c2e56f1d7795c4d7"] // add the account that will deploy the contract (private key)
   }
  },
  paths:{
    artifacts: './react-admin/src/artifacts',
  }

};
