// contracts/Superpower.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Superpower is ERC721Enumerable, ERC721Royalty, ERC721URIStorage, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;
    address private _admin;

    constructor(address initialOwner)
        ERC721Royalty()
        ERC721("SuperpowerNFT", "SPWNFT")
        Ownable(msg.sender)
    {
        _admin = initialOwner;

        // Set default royalty recipient and percentage
        _setDefaultRoyalty(msg.sender, 500);
    }

    function safeMint(address to) public onlyAdmin {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721Royalty, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function _baseURI() internal pure override returns (string memory) {
         return "https://carbon-league-arfa.vercel.app/api/superpowers/";
     }

    function setAdmin(address newAdmin) public onlyOwner {
        require(newAdmin != address(0), "New admin cannot be the zero address");
        _admin = newAdmin;
    }

    modifier onlyAdmin() {
        require(msg.sender == _admin, "Only admin can call this function");
        _;
    }

    function contractURI() public pure returns (string memory) {
        string memory json = '{"image":"https://c.imgz.jp/539/75855539/75855539_1_d_500.jpg","external_url":"https://carbon-league-arfa.vercel.app","description":"Nice Shoes","name":"Superpower","collaborators":["0x0000000000000000000000000000000000000000"]}';
        return string.concat("data:application/json;utf8,", json);
    }
}
