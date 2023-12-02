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
const tokenAddress = process.env.TOKEN_ADDRESS; // 例: "0x123..."
const tokenContract = await ethers.getContractAt("IERC20", tokenAddress);
const tokenName = await tokenContract.name();

console.log("Token name:", tokenName);
// Calling the transfer function of the IERC20 contract
// Replace 'recipientAddress' and 'amount' with actual values
  const recipientAddress = "0x216317a44771b7C71a182f2b0b52786c3Ca3Ef30"; // Recipient's address
  const amount = ethers.utils.parseUnits("50.0", 18); // ここは string型

  try {
    const transferResult = await tokenContract.transfer(recipientAddress, amount);
    console.log("Transfer result:", transferResult);
  } catch (error) {
    console.error("Error in transfer:", error);
  }
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});