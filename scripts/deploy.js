// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
async function main() {

  //getting the list of signers account from ethers.js
  const [deployer] = await ethers.getSigners();

  console.log(
  "Deploying contracts with the account:",
  deployer.address
  );

  //ethers.js method ContractFactory. This will look for the HelloWorld.sol file, and return an instance that we can use ContractFactory methods on.
  const HelloWorld = await ethers.getContractFactory("HelloWorld");
  const contract = await HelloWorld.deploy();

  const IERC20 = await ethers.getContractFactory("IERC20");
  const contract2 = await IERC20.deploy();

  console.log("Contract deployed at:", contract.address);

  //デプロイ済みのコントラクトの speak 関数を呼び出している.
  const saySomething = await contract.speak();
  
  console.log("saySomething value:", saySomething);
}

main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});