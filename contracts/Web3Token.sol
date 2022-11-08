// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Web3Token", "WEB3") {
        _mint(msg.sender, initialSupply);
    }
}
