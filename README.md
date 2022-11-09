# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

This project is a basic hardhat project for ERC20 token creatiion, It has

1. ERC20 contract
2. A test for that contract.
3. A script that deploys and verifies the contract automatically.

This project is about creating your own token of ERC20 standard, where the owner of the contract can :

1. Deploy and mint any amount of tokens.
2. Mint any amount of extra supply.
3. Anyone holding the token will be able to burn any amount of token he wants.

I've used Openzeppelin library of ERC20 tokens to create this contract.

Try running some of the following tasks in case you are stuck :

yarn hardhat help
yarn hardhat test
yarn hardhat deploy --network goerli
