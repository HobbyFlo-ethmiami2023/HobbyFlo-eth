pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract HashNFT is ERC721 {

    constructor() ERC721("HashNFT", "HNFT") {}

    struct NFTMetadata {
        string hash;
    }

    mapping(uint256 => NFTMetadata) public nftMetadata;

    function mintNFT(string memory hash) public returns (uint256) {
        //Boolean for hash
        require(bytes(hash).length > 0, "Invalid hash input.");

       
        uint256 tokenId = totalSupply() + 1;
        _mint(msg.sender, tokenId);

        // Include metadata
        NFTMetadata metadata = NFTMetadata(hash);
        nftMetadata[tokenId] = metadata;

        // Return the token ID.
        return tokenId;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        // Get the NFT metadata.
        NFTMetadata memory metadata = nftMetadata[tokenId];

        // Encode the NFT metadata to JSON.
        string memory json = jsonEncode(metadata);

        // Return the token URI.
        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(json)));
    }

    function jsonEncode(NFTMetadata memory metadata) internal pure returns (string memory) {
        return string(abi.encodePacked(
            "{",
            '"hash": "', metadata.hash, '"',
            "}",
            ")"
        ));
    }
}