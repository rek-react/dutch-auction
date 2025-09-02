"use client";

import { PropsWithChildren } from "react";
import ReactModal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { RemoveScroll } from "react-remove-scroll";

import { Typography } from "../typography";
import { Button } from "../button";

import { IconButton } from "../icon-button";

ReactModal.setAppElement("#modals");

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  label?: string;
}

export function Modal({
  children,
  onClose,
  open,
  label,
}: PropsWithChildren<ModalProps>) {
  return (
    <ReactModal
      isOpen={open}
      onRequestClose={onClose}
      overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
      className="bg-background rounded-lg w-md p-6 relative outline-0"
    >
      <RemoveScroll>
        <div className="max-h-[90vh] overflow-y-auto">
          <IconButton
            className="absolute top-3 right-3 z-10"
            aria-label="Close"
            onClick={onClose}
          >
            <FaTimes size={20} />
          </IconButton>

          {label && (
            <Typography variant="h3" className="pr-6 font-semibold">
              {label}
            </Typography>
          )}
          <div className="mt-5">{children}</div>
        </div>
      </RemoveScroll>
    </ReactModal>
  );
}
