import { formatEther, parseEther } from "viem";
import hre from "hardhat";
const fs = require('fs');

async function main() {
  const superpower = await hre.viem.deployContract("Superpower", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"], {
    gasPrice: 50000000000,
  });

  // write contract Address to file
  fs.writeFileSync('./.contract', superpower.address);

  console.log(
    `Superpower contract deployed to ${superpower.address}`
  );

  // Get the first wallet address
  const [owner, admin] = await hre.viem.getWalletClients();
  const ownerAddress = owner.account.address;
  const adminAddress = admin.account.address;

   // Write addresses to file
  fs.writeFileSync('./.ownerAddress', ownerAddress);
  fs.writeFileSync('./.adminAddress', adminAddress);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
