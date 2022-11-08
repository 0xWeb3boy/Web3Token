const networkConfig = {
  31337: {
    name: "localhost",
  },
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  5: {
    name: "goerli",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
  },
  80001: {
    name: "polygon",
    ethUsdPriceFeed: "0x0715A7794a1dc8e42615F059dD6e406A6594651A",
  },
};
const INITIAL_SUPPLY = "100000000000000000000000";

const developmentChains = ["hardhat", "localhost"];

module.exports = {
  networkConfig,
  developmentChains,
  INITIAL_SUPPLY,
};
