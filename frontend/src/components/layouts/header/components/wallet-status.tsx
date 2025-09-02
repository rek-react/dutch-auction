import { useBalance, useDisconnect } from "wagmi";
import { Address } from "viem";
import { Button, Skeleton, Typography } from "@/components/ui";
import { ConnectWallet } from "@/components/connect-wallet";
import { formatEth } from "@/utils";

interface WalletStatusProps {
  closeBurgerMenu?: () => void;
  address?: Address;
}

export function WalletStatus({ closeBurgerMenu, address }: WalletStatusProps) {
  const { disconnect } = useDisconnect();
  const { data, isLoading } = useBalance({ address });

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 md:items-center md:gap-4 md:flex-row">
        <Skeleton width={70} height={25} className="rounded" />
        <Skeleton width={145} height={50} className="rounded-2xl" />
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex flex-col gap-2 md:items-center md:gap-4 md:flex-row">
        <Typography className="font-semibold text-center">
          {formatEth(data.value)} {data.symbol}
        </Typography>
        <Button
          onClick={() => {
            disconnect();
            closeBurgerMenu?.();
          }}
          className="bg-red-accent flex-1"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return <ConnectWallet className="w-full" />;
}
