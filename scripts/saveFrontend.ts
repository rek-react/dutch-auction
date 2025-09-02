import { EngAuction, PrizeNFT } from "../typechain-types";
import path from "path";
import fs from "fs";

type Contracts = {
  [key in string]: EngAuction | PrizeNFT;
};

export const saveFrontend = async (contracts: Contracts) => {
  const contractsDir = path.join(
    __dirname,
    "..",
    "frontend",
    "src",
    "contracts"
  );

  if (!fs.existsSync(contractsDir))
    fs.mkdirSync(contractsDir, { recursive: true });

  for (const [contractName, contract] of Object.entries(contracts)) {
    const abi = contract.interface.formatJson();
    const address = await contract.getAddress();

    fs.writeFileSync(
      path.join(contractsDir, `${contractName}.json`),
      JSON.stringify({ address, abi: JSON.parse(abi) }, null, 2)
    );
  }
};
