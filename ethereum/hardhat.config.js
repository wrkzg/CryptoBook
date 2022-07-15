require("@nomicfoundation/hardhat-toolbox");

task("accounts", "Prints the list of accounts", async (taskAgrs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts){
    console.log(account.address);
  }
});

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks: {
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/e2ea658822064f318630832c4930fac1", //Infura url with projectId
      accounts: ["f7b46c4051e8c438e2de6fb6d6c5d28dbd8f15076b346c475ef2f643e65b1a3c"] // add the account that will deploy the contract (private key)
     },
   }
};
