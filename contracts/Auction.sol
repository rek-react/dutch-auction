// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract EngAuction {
    uint constant FEE = 10;
    uint constant DURATION = 1 days;

    address public owner;

    struct Prize {
        address nftAddress;
        uint tokenId;
        string tokenURI;
    }

    struct Auction {
        address payable seller;
        uint startPrice;
        uint finalPrice;
        uint startAt;
        uint endAt;
        uint discountRate;
        uint duration;
        Prize prize;
        bool stopped;
    }

   Auction[] public auctions;

   event AuctionCreated(uint index, Prize prize, uint startPrice, uint duration);
   event AuctionEnded(uint index, uint finalPrice, address buyer);
   event Refund(uint index, address buyer, uint refund);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(owner == msg.sender, "you are not owner");
        _;
    }

    function getAuctions() public view returns(Auction[] memory){
        return auctions;
    }

    function createAuction(uint _startPrice, uint _duration, address _nftAddress, uint _tokenId, string memory _tokenURI) public {

        require(bytes(_tokenURI).length > 0, "tokenURI cannot be empty");
        
        uint duration = _duration==0 ? DURATION : _duration;
        uint discountRate = _startPrice / duration;

        IERC721(_nftAddress).transferFrom(msg.sender, address(this), _tokenId);

        Prize memory _prize = Prize({
            nftAddress:_nftAddress,
            tokenId:_tokenId,
            tokenURI:_tokenURI
        });

        Auction memory newAuction = Auction({
            seller: payable(msg.sender),
            startPrice:_startPrice,
            finalPrice:_startPrice,
            startAt:block.timestamp,
            endAt:block.timestamp + duration,
            discountRate: discountRate,
            duration:duration,
            prize: _prize,
            stopped:false
        });

        auctions.push(newAuction);

        emit AuctionCreated(auctions.length - 1, _prize, _startPrice, duration);
    }

    function getAuctionPrice(uint _index) public view returns(uint) {
        require(_index < auctions.length, "auction does not exist");

        Auction memory auction = auctions[_index];
        require(!auction.stopped, "auction stopped");

        uint datePassed = block.timestamp - auction.startAt;
        uint discountRate = auction.startPrice / auction.duration;
        uint discountPassed = datePassed * discountRate;

        if (discountPassed >= auction.startPrice) {
            return 0;
        }

        return auction.startPrice - discountPassed;
    }

    function buy(uint _index ) public payable {
        require(_index < auctions.length, "auction does not exist");

        Auction storage auction = auctions[_index];
        require(!auction.stopped, "auction stopped");
        require(auction.endAt > block.timestamp, "auction ended");
        require(msg.sender != auction.seller, "seller cannot buy their own NFT");

        uint price = getAuctionPrice(_index);

        require(msg.value >= price, "not enough funds");

        if(msg.value > price){
            uint refund = msg.value - price;
            payable(msg.sender).transfer(refund);
            emit Refund(_index,msg.sender, refund);
        }
        auction.stopped = true;
        auction.finalPrice = price;

        IERC721(auction.prize.nftAddress).safeTransferFrom(address(this), msg.sender, auction.prize.tokenId);

        auction.seller.transfer(price - (price * FEE) / 100);

        emit AuctionEnded(_index, price, msg.sender);
    }

    function withdrawFunds() public payable onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}