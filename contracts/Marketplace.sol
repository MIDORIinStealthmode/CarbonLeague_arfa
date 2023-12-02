// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);

    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    // 追加で呼び出したい関数を指定
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
}

contract Marketplace {
    IERC20 public token;
    address public walletM; // 売り手のアドレス
    address public walletC; // 買い手のアドレス

    constructor(address _tokenAddress, address _walletM, address _walletC) {
        token = IERC20(_tokenAddress);
        walletM = _walletM;
        walletC = _walletC;
    }

    function makePayment(uint256 amount) external {
        require(msg.sender == walletC, "Only WalletC can make payments");
        token.transfer(walletM, amount);
    }
}
