import { Image } from "../image";
import { IconButton } from "../icon-button";
import { ButtonHTMLAttributes } from "react";
import { FileWithPath } from "react-dropzone";
import { FaTimes } from "react-icons/fa";

export function SingleFilePreview({ file }: { file: FileWithPath }) {
  return (
    <div className="absolute left-0 top-0 w-full h-full">
      <Image
        className="w-full h-full"
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
    </div>
  );
}

export function DeleteButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <IconButton
      className="absolute top-2 right-2 bg-gray-900/70 hover:bg-gray-900/50 z-[5]"
      {...props}
    >
      <FaTimes size={20} />
    </IconButton>
  );
}
