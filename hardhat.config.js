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
    accounts: ["28c80c76dc8dbfb442d93503d7583f645d96881346129be7ef74c01a8ad13378","dc32242523cf610bf7c16b778a5629337e4a213cec81b837e05a2a34bd73e5b9"] // add the account that will deploy the contract (private key)
   }
  },
  paths:{
    artifacts: './react-admin/src/artifacts',
  }

};

