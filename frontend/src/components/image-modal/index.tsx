import React from "react";
import { Image, Modal, ModalProps, Typography } from "../ui";

interface ImageModalProps extends ModalProps {
  src: string;
  alt: string;
}

export function ImageModal({
  src,
  alt = "Modal Image",
  ...other
}: ImageModalProps) {
  return (
    <Modal {...other}>
      <Image className="rounded" ratio="6/4" src={src} alt={alt} />
    </Modal>
  );
}
