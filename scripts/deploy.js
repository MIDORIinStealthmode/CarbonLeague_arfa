// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
require('dotenv').config();

async function main() {

  //getting the list of signers account from ethers.js
  const [deployer] = await ethers.getSigners();

  console.log(
  "Deploying contracts with the account:",
  deployer.address
  );

//deploying IERC20
const tokenAddress = '0xB3353dcE62550b46E6bd423022448241ac40D3A4'; // 例: "0x123..."
const tokenContract = await ethers.getContractAt("IERC20", tokenAddress);
const tokenName = await tokenContract.name();

console.log("Contract deployed at:", tokenAddress);

// Calling the transfer function of the IERC20 contract
// Replace 'recipientAddress' and 'amount' with actual values
  const recipientAddress = "0xbeB0e66B9c81E055534aEddF9026BD4C48C6CBA9"; // Recipient's address
  const amount = ethers.utils.parseUnits(1.0, 18); // Amount to transfer (1.0 token, for example)

  const transferResult = await ierc20Contract.transfer(recipientAddress, amount);
  console.log("Transfer result:", transferResult);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});