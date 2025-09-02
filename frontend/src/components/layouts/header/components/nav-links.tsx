import { Address } from "viem";
import { PATHS } from "@/config/paths";
import Link from "next/link";

interface NavLinksProps {
  closeBurgerMenu?: () => void;
  address?: Address;
}

export function NavLinks({ closeBurgerMenu, address }: NavLinksProps) {
  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-6">
      <Link href={PATHS.auctions} onClick={closeBurgerMenu}>
        Auctions
      </Link>
      {address && (
        <Link href={PATHS.myNft} onClick={closeBurgerMenu}>
          My NFT
        </Link>
      )}
    </nav>
  );
}
