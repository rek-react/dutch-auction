"use client";

import { FileWithPath } from "react-dropzone";
import { Modal } from "../modal";
import { Image } from "../image";
import { useState } from "react";
import { FaFileAlt, FaRegImage, FaTimes } from "react-icons/fa";

interface MultiFilePreviewProps {
  files: FileWithPath[];
  onRemove: (file: FileWithPath) => void;
}

export function MultiFilePreview({ files, onRemove }: MultiFilePreviewProps) {
  const [file, setFile] = useState<FileWithPath | null>(null);

  return (
    <>
      <div className="mt-4 grid grid-cols-2 gap-4">
        {files.map((file) => (
          <div
            className="flex-1/2 px-3 py-3.5 rounded-md bg-slate-200 space-y-3"
            key={file.path}
          >
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <div
                  className="text-blue-accent cursor-pointer"
                  onClick={() => setFile(file)}
                >
                  {file.type.match(/image.*/i) ? (
                    <FaRegImage size={40} />
                  ) : (
                    <FaFileAlt size={40} />
                  )}
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-caption">
                    {file.name}
                  </div>
                  <div className="text-[10px] font-medium text-gray-400">{`${Math.floor(
                    file.size / 1024
                  )} KB`}</div>
                </div>
              </div>
              <div className="flex-1 flex justify-end">
                <div className="space-y-1">
                  <div
                    className="text-caption cursor-pointer"
                    onClick={() => onRemove(file)}
                  >
                    <FaTimes size={20} />
                  </div>
                  <div className="text-[10px] font-medium text-gray-400">
                    Done
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal open={!!file} onClose={() => setFile(null)}>
        {file && (
          <Image src={URL.createObjectURL(file)} ratio="4/3" alt="Image" />
        )}
      </Modal>
    </>
  );
}
