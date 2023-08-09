// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleTransfer {
    event TokenTransfer(address indexed sender, address indexed recipient, uint256 amount);
    event EthTransfer(address indexed sender, address indexed recipient, uint256 amount);

    modifier addressIsNotEmpty(address addr) {
        require(addr != address(0), "Address is empty!");
        _;
    }

    function transferToken(address tokenAddress, address recipient, uint256 amount) external addressIsNotEmpty(recipient) {
        IERC20 token = IERC20(tokenAddress);
        require(token.balanceOf(msg.sender) >= amount, "Insufficient balance");
        require(token.allowance(msg.sender, address(this)) >= amount, "Not allowed");

        bool sent = token.transferFrom(msg.sender, address(this), amount);
        require(sent, "Token transfer failed");
        
        bool success = token.transfer(recipient, amount);
        require(success, "Token transfer failed");

        emit TokenTransfer(address(this), recipient, amount);
    }

    function transferEth(address payable recipient) external payable addressIsNotEmpty(recipient) {
        require(msg.sender.balance >= msg.value, "Insufficient balance");
        recipient.transfer(msg.value);
        emit EthTransfer(msg.sender, recipient, msg.value);
    }
}