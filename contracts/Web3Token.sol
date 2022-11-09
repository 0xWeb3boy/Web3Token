// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Web3Token is ERC20 {
    address public admin;

    constructor(uint256 initialSupply) ERC20("Web3Token", "WEB3") {
        _mint(msg.sender, initialSupply);
        admin = msg.sender;
    }

    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }

    function mint(uint256 amount) public virtual {
        require(msg.sender == admin, "Only admin");
        _mint(_msgSender(), amount);
    }
}
