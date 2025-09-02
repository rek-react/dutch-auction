"use client";

import { Button, ButtonProps, Image, Modal, Typography } from "../ui";
import { Connector, useConnect } from "wagmi";
import { useBoolean } from "minimal-shared";

const connectorIcons: Record<Connector["name"], string> = {
  MetaMask: "metamask",
  WalletConnect: "wallet-connect",
  "Coinbase Wallet": "coinbase",
};

export function ConnectWallet(props: ButtonProps) {
  const {
    value: isModal,
    onFalse: onCloseModal,
    onTrue: onOpenModal,
  } = useBoolean(false);

  const { connectors, connect } = useConnect();

  return (
    <>
      <Button
        {...props}
        onClick={(e) => {
          onOpenModal();
          props.onClick?.(e);
        }}
      >
        Connect wallet
      </Button>
      <Modal open={isModal} onClose={onCloseModal} label="Connect wallet">
        <div className="bg-background-secondary rounded-lg flex flex-col border border-gray-600 overflow-hidden">
          {connectors.map((connector) => (
            <button
              className="border-b border-b-gray-600 last:border-b-0 cursor-pointer hover:bg-background-hover transition"
              key={connector.uid}
              onClick={() => connect({ connector })}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/icons/wallets/${connectorIcons[connector.name]}.svg`}
                    className="size-6"
                    alt={connector.name}
                  />

                  <Typography className="font-semibold" variant="span">
                    {connector.name}
                  </Typography>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
}
