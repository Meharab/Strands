// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(address spender) ERC20("MyToken", "MTK") {
        _mint(msg.sender, 50 * 10 ** decimals());
        _approve(msg.sender, spender, 50 * 10 ** decimals());
    }
}