import { formatEther, parseEther } from "viem";
import hre from "hardhat";

async function main() {
  const superpower = await hre.viem.deployContract("Superpower", ["0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"], {
    gasPrice: 50000000000,
  });

  console.log(
    `Superpower contract deployed to ${superpower.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
