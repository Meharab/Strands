require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("dotenv").config({ path: ".env" });

module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        runs: 200,
        enabled: true,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ETH_LINEA: {
      accounts: [`${process.env.PRIVATE_KEY}`],
      url: `https://linea-goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
    },
  },
};