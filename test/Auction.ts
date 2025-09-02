import { expect } from "chai";
import { ethers } from "hardhat";
import { EngAuction, PrizeNFT } from "../typechain-types";

describe("EngAuction + PrizeNFT", () => {
  let auction: EngAuction;
  let prizeNFT: PrizeNFT;

  let owner: any;
  let seller: any;
  let buyer: any;

  const TOKEN_URI = "ipfs://my-token";
  const START_PRICE = ethers.parseEther("1");
  const DURATION = 100; // seconds
  const TOKEN_ID = 0;

  beforeEach(async () => {
    [owner, seller, buyer] = await ethers.getSigners();

    // Deploy auction
    const Auction = await ethers.getContractFactory("EngAuction", owner);
    auction = await Auction.deploy();
    await auction.waitForDeployment();

    // Deploy PrizeNFT
    const PrizeNFT = await ethers.getContractFactory("PrizeNFT", owner);
    prizeNFT = await PrizeNFT.deploy();
    await prizeNFT.waitForDeployment();

    // Mint NFT to seller
    await prizeNFT.connect(seller).mint(seller.address, TOKEN_URI);
    expect(await prizeNFT.ownerOf(TOKEN_ID)).to.eq(seller.address);

    // Approve auction
    await prizeNFT
      .connect(seller)
      .setApprovalForAll(await auction.getAddress(), true);
  });

  describe("createAuction", () => {
    it("should create auction", async () => {
      const tx = await auction
        .connect(seller)
        .createAuction(
          START_PRICE,
          DURATION,
          await prizeNFT.getAddress(),
          TOKEN_ID,
          TOKEN_URI
        );

      await expect(tx)
        .to.emit(auction, "AuctionCreated")
        .withArgs(
          0,
          [await prizeNFT.getAddress(), TOKEN_ID, TOKEN_URI],
          START_PRICE,
          DURATION
        );

      const auctions = await auction.getAuctions();
      expect(auctions.length).to.eq(1);
      expect(auctions[0].seller).to.eq(seller.address);

      expect(await prizeNFT.ownerOf(TOKEN_ID)).to.eq(
        await auction.getAddress()
      );
    });

    it("should revert tokenURI cannot be empty", async () => {
      await expect(
        auction
          .connect(seller)
          .createAuction(
            START_PRICE,
            DURATION,
            await prizeNFT.getAddress(),
            TOKEN_ID,
            ""
          )
      ).to.be.revertedWith("tokenURI cannot be empty");
    });
  });

  describe("getAuctionPrice", () => {
    it("should decrease price over time", async () => {
      await auction
        .connect(seller)
        .createAuction(
          START_PRICE,
          DURATION,
          await prizeNFT.getAddress(),
          TOKEN_ID,
          TOKEN_URI
        );

      const initialPrice = await auction.getAuctionPrice(0);
      await ethers.provider.send("evm_increaseTime", [10]);
      await ethers.provider.send("evm_mine", []);
      const laterPrice = await auction.getAuctionPrice(0);

      expect(laterPrice).to.be.lt(initialPrice);
    });
  });

  describe("buy", () => {
    it("should let buyer buy and transfer NFT", async () => {
      await auction
        .connect(seller)
        .createAuction(
          START_PRICE,
          DURATION,
          await prizeNFT.getAddress(),
          TOKEN_ID,
          TOKEN_URI
        );

      const buyTx = await auction.connect(buyer).buy(0, { value: START_PRICE });

      const currentAuction = await auction.auctions(0);
      const finalPrice = currentAuction.finalPrice;

      await expect(buyTx)
        .to.emit(auction, "AuctionEnded")
        .withArgs(0, finalPrice, buyer.address);

      expect(await prizeNFT.ownerOf(TOKEN_ID)).to.eq(buyer.address);
    });

    it("should refund buyer if overpaid", async () => {
      await auction
        .connect(seller)
        .createAuction(
          START_PRICE,
          DURATION,
          await prizeNFT.getAddress(),
          TOKEN_ID,
          TOKEN_URI
        );

      const overpay = START_PRICE + ethers.parseEther("0.5");

      const buyTx = await auction.connect(buyer).buy(0, { value: overpay });

      const currentAuction = await auction.auctions(0);
      const finalPrice = currentAuction.finalPrice;

      await expect(buyTx)
        .to.emit(auction, "Refund")
        .withArgs(0, buyer.address, overpay - finalPrice);
    });

    it("should revert if auction ended", async () => {
      await auction
        .connect(seller)
        .createAuction(
          START_PRICE,
          1,
          await prizeNFT.getAddress(),
          TOKEN_ID,
          TOKEN_URI
        );

      await ethers.provider.send("evm_increaseTime", [2]);
      await ethers.provider.send("evm_mine", []);

      await expect(
        auction.connect(buyer).buy(0, { value: START_PRICE })
      ).to.be.revertedWith("auction ended");
    });

    it("should revert if seller tries to buy their own NFT", async () => {
      await auction
        .connect(seller)
        .createAuction(
          START_PRICE,
          DURATION,
          await prizeNFT.getAddress(),
          TOKEN_ID,
          TOKEN_URI
        );

      await expect(
        auction.connect(seller).buy(0, { value: START_PRICE })
      ).to.be.revertedWith("seller cannot buy their own NFT");
    });

    it("should allow only owner to withdraw funds", async () => {
      await auction
        .connect(seller)
        .createAuction(
          START_PRICE,
          DURATION,
          await prizeNFT.getAddress(),
          TOKEN_ID,
          TOKEN_URI
        );

      await auction.connect(buyer).buy(0, { value: START_PRICE });

      const currentAuction = await auction.auctions(0);
      const finalPrice = currentAuction.finalPrice;

      await expect(
        auction.connect(owner).withdrawFunds()
      ).to.changeEtherBalance(owner, (finalPrice * 10n) / 100n);

      await expect(auction.connect(buyer).withdrawFunds()).to.be.revertedWith(
        "you are not owner"
      );
    });
  });
});
