import { ethers } from "hardhat";
import { saveFrontend } from "./saveFrontend";

const main = async () => {
  const [signer] = await ethers.getSigners();

  const Auction = await ethers.getContractFactory("EngAuction", signer);
  const auction = await Auction.deploy();
  await auction.deploymentTransaction()?.wait();

  const PrizeNFT = await ethers.getContractFactory("PrizeNFT", signer);
  const prizeNFT = await PrizeNFT.deploy();
  await prizeNFT.deploymentTransaction()?.wait();

  saveFrontend({
    EngAuction: auction,
    PrizeNFT: prizeNFT,
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
