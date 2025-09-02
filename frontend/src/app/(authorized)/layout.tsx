"use client";

import { PATHS } from "@/config/paths";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";
import { useAccount } from "wagmi";

export default function Layout({ children }: PropsWithChildren) {
  const { isConnected } = useAccount();

  if (!isConnected) {
    redirect(PATHS.connectWallet);
  }

  return <>{children}</>;
}
