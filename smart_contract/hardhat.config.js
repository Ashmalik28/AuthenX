require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config(); 

module.exports = {
  solidity: "0.8.20",
  networks: {
    hardhat: {}, // local Hardhat network
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [process.env.PRIVATE_KEY] // from .env
    }
  }
};
