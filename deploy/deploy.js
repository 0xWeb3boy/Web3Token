const { network } = require("hardhat");
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../helper-hardhat-config");
const { verify } = require("../verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const Web3Token = await deploy("Web3Token", {
    from: deployer,
    args: [INITIAL_SUPPLY],
    log: true,
    // we need to wait if on a live network so we can verify properly
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  log(`Web3Token deployed at ${Web3Token.address}`);

  if (
    !developmentChains.includes(network.name) &&
    process.env.POLYGONSCAN_API_KEY
  ) {
    await verify(Web3Token.address, [INITIAL_SUPPLY]);
  }
};

module.exports.tags = ["all", "token"];
