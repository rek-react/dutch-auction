// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract PrizeNFT is  ERC721URIStorage {
    uint private _tokenIds;

    mapping (address => uint[]) private _ownerIds;

    struct Token {
        uint tokenId;
        string tokenURI;
    }

    constructor() ERC721("PrizeNFT", "PZN") {}

    function getOwnerTokens(address owner) external view returns(Token[] memory) {
        uint[] storage ids = _ownerIds[owner];

        Token[] memory tokens = new Token[](ids.length);

        for (uint i = 0; i < ids.length; i++) {
            uint id = ids[i];
            tokens[i] = Token({
                tokenId: id,
                tokenURI: tokenURI(id)
            });
        }

        return tokens;
    }

    function mint(address to, string memory tokenURI) public {
        _mint(to, _tokenIds);
        _setTokenURI(_tokenIds, tokenURI);
        _tokenIds++;
    }

    function burn(uint256 tokenId) public {
        _checkAuthorized(ownerOf(tokenId), msg.sender, tokenId);
        _burn(tokenId);
    }
    

    function _update(address to, uint256 tokenId, address auth) internal override returns (address) {
        address from = super._update(to, tokenId, auth);

        if (from != address(0)) {
            uint256[] storage ids = _ownerIds[from];
            for (uint256 i = 0; i < ids.length; i++) {
                if (ids[i] == tokenId) {
                    ids[i] = ids[ids.length - 1];
                    ids.pop();
                    break;
                }
            }
        }

        if (to != address(0)) {
            _ownerIds[to].push(tokenId);
        }

        return from; 
    }

}