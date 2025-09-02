import { ConnectWallet, Typography } from "@/components";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center container py-20">
      <Typography variant="h2" className="mb-2">
        Connect wallet
      </Typography>
      <Typography variant="p" className="mb-6 text-caption">
        To see your NFTs, connect your wallet
      </Typography>
      <ConnectWallet />
    </div>
  );
}
