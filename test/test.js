const { assert, expect } = require("chai");
const { network, getNamedAccounts, deployments, ethers } = require("hardhat");
const {
  developmentChains,
  INITIAL_SUPPLY,
} = require("../helper-hardhat-config");

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Web3Token Unit Test", function () {
      //Multipler is used to make reading the math easier because of the 18 decimal points
      const multiplier = 10 ** 18;
      let Web3Token, deployer, user1;
      beforeEach(async function () {
        const accounts = await getNamedAccounts();
        deployer = accounts.deployer;
        user1 = accounts.user1;

        await deployments.fixture("all");
        Web3Token = await ethers.getContract("Web3Token", deployer);
      });
      it("was deployed", async () => {
        assert(Web3Token.address);
      });
      describe("constructor", () => {
        it("Should have correct INITIAL_SUPPLY of token ", async () => {
          const totalSupply = await Web3Token.totalSupply();
          assert.equal(totalSupply.toString(), INITIAL_SUPPLY);
        });
        it("initializes the token with the correct name and symbol ", async () => {
          const name = (await Web3Token.name()).toString();
          assert.equal(name, "Web3Token");

          const symbol = (await Web3Token.symbol()).toString();
          assert.equal(symbol, "WEB3");
        });
      });
      describe("transfers", () => {
        it("Should be able to transfer tokens successfully to an address", async () => {
          const tokensToSend = ethers.utils.parseEther("10");
          await Web3Token.transfer(user1, tokensToSend);
          expect(await Web3Token.balanceOf(user1)).to.equal(tokensToSend);
        });
        it("emits an transfer event, when an transfer occurs", async () => {
          await expect(
            Web3Token.transfer(user1, (10 * multiplier).toString())
          ).to.emit(Web3Token, "Transfer");
        });
      });
      describe("allowances", () => {
        const amount = (20 * multiplier).toString();
        beforeEach(async () => {
          playerToken = await ethers.getContract("Web3Token", user1);
        });
        it("Should approve other address to spend token", async () => {
          const tokensToSpend = ethers.utils.parseEther("5");
          await Web3Token.approve(user1, tokensToSpend);
          const Web3Token1 = await ethers.getContract("Web3Token", user1);
          await Web3Token1.transferFrom(deployer, user1, tokensToSpend);
          expect(await Web3Token1.balanceOf(user1)).to.equal(tokensToSpend);
        });
        it("doesn't allow an unnaproved member to do transfers", async () => {
          //Deployer is approving that user1 can spend 20 of their precious OT's

          await expect(
            playerToken.transferFrom(deployer, user1, amount)
          ).to.be.revertedWith("ERC20: insufficient allowance");
        });
        it("emits an approval event, when an approval occurs", async () => {
          await expect(Web3Token.approve(user1, amount)).to.emit(
            Web3Token,
            "Approval"
          );
        });
        it("the allowance being set is accurate", async () => {
          await Web3Token.approve(user1, amount);
          const allowance = await Web3Token.allowance(deployer, user1);
          assert.equal(allowance.toString(), amount);
        });
        it("won't allow a user to go over the allowance", async () => {
          await Web3Token.approve(user1, amount);
          await expect(
            playerToken.transferFrom(
              deployer,
              user1,
              (40 * multiplier).toString()
            )
          ).to.be.revertedWith("ERC20: insufficient allowance");
        });
      });
    });
