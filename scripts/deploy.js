import { ethers } from "hardhat";

const AMOUNT = 10;
const ADDRESS = "0x3483Be5373B040892952cF92c5889C1B2eB0e509";

async function main() {
  const eth = hre.ethers.parseEther("0.0001");

  const simpleTransfer = await ethers.getContractFactory("SimpleTransfer");
  const transferContract = await simpleTransfer.deploy();
  await transferContract.deployed();
  console.log(`Simple Transfer deployed to ${transferContract.address}`);
  
  const token = await ethers.getContractFactory("MyToken");
  const tokenContract = await token.deploy(transferContract.address);
  await tokenContract.deployed();
  console.log(`My Token deployed to ${tokenContract.address}`);

  accounts = await ethers.getSigners();
  
  const ethTX = await transferContract.transferEth(ADDRESS, { value: eth, });
  const ethTxReceipt = await ethTX.wait();
  console.log(`The transaction hash is ${ethTxReceipt.transactionHash}`);

  const tokenTX = await transferContract.transferToken(tokenContract.address, ADDRESS, AMOUNT);
  const tokenTxReceipt = await tokenTX.wait();
  console.log(`The transaction hash is ${tokenTxReceipt.transactionHash}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
