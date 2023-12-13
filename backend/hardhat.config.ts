import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-viem";
import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.MNEMONIC,
      },
      chainId: 1337,
    }
  }
};

export default config;
