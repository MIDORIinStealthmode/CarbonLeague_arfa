require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

const endpointUrl = process.env.ADD_YOUR_QUICKNODE_URL_HERE;
const privateKey = process.env.ADD_YOUR_PRIVATE_KEY_HERE;

module.exports = {
  solidity: "0.8.21",
  networks: {
    sepolia: {
      url: endpointUrl,
      accounts: [privateKey],
    },
  },
};
