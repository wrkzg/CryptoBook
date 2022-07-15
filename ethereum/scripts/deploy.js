
const {ethers} = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account: ", deployer.address); 
  
  const ContactFactory = await ethers.getContractFactory("ContactFactory");
  const contactFactory = await ContactFactory.deploy();

  await contactFactory.deployed();

  console.log("Contact deployed. Contract address: ", contactFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
