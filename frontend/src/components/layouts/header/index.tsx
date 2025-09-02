"use client";

import { Typography } from "@/components/ui";
import { PATHS } from "@/config/paths";
import Link from "next/link";
import { useAccount } from "wagmi";
import { NavLinks } from "./components/nav-links";
import { WalletStatus } from "./components/wallet-status";
import { BurgerMenu } from "./components/burger-menu";

export function Header() {
  const { address } = useAccount();

  return (
    <header>
      <div className="flex justify-between items-center py-4 container">
        <Link href={PATHS.auctions}>
          <Typography variant="h4" className="text-primary font-semibold">
            NFT Auction
          </Typography>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLinks address={address} />
          <WalletStatus address={address} />
        </div>

        <BurgerMenu address={address} />
      </div>
    </header>
  );
}
