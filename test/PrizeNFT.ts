import { expect } from "chai";
import { ethers } from "hardhat";
import { PrizeNFT } from "../typechain-types";

describe("PrizeNFT", () => {
  let nft: PrizeNFT;
  let owner: any;
  let alice: any;
  let bob: any;

  const TOKEN_URI_1 = "ipfs://token-1";
  const TOKEN_URI_2 = "ipfs://token-2";

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    const PrizeNFT = await ethers.getContractFactory("PrizeNFT", owner);
    nft = await PrizeNFT.deploy();
    await nft.waitForDeployment();
  });

  it("should mint token and set correct owner + URI", async () => {
    await nft.connect(alice).mint(alice.address, TOKEN_URI_1);

    expect(await nft.ownerOf(0)).to.eq(alice.address);
    expect(await nft.tokenURI(0)).to.eq(TOKEN_URI_1);

    const tokens = await nft.getOwnerTokens(alice.address);
    expect(tokens.length).to.eq(1);
    expect(tokens[0].tokenId).to.eq(0);
    expect(tokens[0].tokenURI).to.eq(TOKEN_URI_1);
  });

  it("should mint multiple tokens and track them", async () => {
    await nft.connect(alice).mint(alice.address, TOKEN_URI_1);
    await nft.connect(alice).mint(alice.address, TOKEN_URI_2);

    const tokens = await nft.getOwnerTokens(alice.address);
    expect(tokens.length).to.eq(2);
    expect(tokens[0].tokenId).to.eq(0);
    expect(tokens[1].tokenId).to.eq(1);
  });

  it("should transfer token and update ownerIds mapping", async () => {
    await nft.connect(alice).mint(alice.address, TOKEN_URI_1);

    await nft.connect(alice).transferFrom(alice.address, bob.address, 0);

    expect(await nft.ownerOf(0)).to.eq(bob.address);

    const aliceTokens = await nft.getOwnerTokens(alice.address);
    expect(aliceTokens.length).to.eq(0);

    const bobTokens = await nft.getOwnerTokens(bob.address);
    expect(bobTokens.length).to.eq(1);
    expect(bobTokens[0].tokenId).to.eq(0);
  });

  it("should burn token by owner", async () => {
    await nft.connect(alice).mint(alice.address, TOKEN_URI_1);

    await nft.connect(alice).burn(0);

    await expect(nft.ownerOf(0)).to.be.revertedWithCustomError(
      nft,
      "ERC721NonexistentToken"
    );
    const tokens = await nft.getOwnerTokens(alice.address);
    expect(tokens.length).to.eq(0);
  });

  it("should revert burn by non-owner", async () => {
    await nft.connect(alice).mint(alice.address, TOKEN_URI_1);

    await expect(nft.connect(bob).burn(0)).to.be.reverted;
  });
});
