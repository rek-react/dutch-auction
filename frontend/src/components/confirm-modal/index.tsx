import React, { ReactNode } from "react";
import { Button, Modal, ModalProps, Typography } from "../ui";

interface ConfirmModalProps extends ModalProps {
  content?: ReactNode;
  action?: ReactNode;
}

export function ConfirmModal({
  content = "Are you sure you want to perform this action? It cannot be undone.",
  action,
  ...other
}: ConfirmModalProps) {
  return (
    <Modal {...other} label="Are you sure?">
      <Typography>{content}</Typography>
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={other.onClose} className="!bg-red-accent" size="small">
          Cancel
        </Button>
        {action}
      </div>
    </Modal>
  );
}
