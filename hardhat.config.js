require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chianId: 1337,
    },
    ropsten: {
      url: `${process.env.ROPSTEN_NETWORK_URL}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
  },
};
