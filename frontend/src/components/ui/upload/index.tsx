import { FileWithPath, useDropzone } from "react-dropzone";
import clsx from "clsx";
import { UploadPlaceholder } from "./placeholder";
import { DeleteButton, SingleFilePreview } from "./preview-single-file";
import { FieldError } from "react-hook-form";
import { Typography } from "../typography";
import { MultiFilePreview } from "./preview-multi-file";

interface UploadProps {
  value: FileWithPath | FileWithPath[];
  onDrop: (acceptedFiles: FileWithPath[]) => void;
  onDelete?: () => void;
  onRemove?: (file: FileWithPath) => void;
  disabled?: boolean;
  multiple?: boolean;
  error?: boolean;
  helperText?: string;
}

export function Upload({
  value,
  multiple,
  disabled,
  onDrop,
  onDelete,
  onRemove,
  error,
  helperText,
  ...other
}: UploadProps) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    disabled,
    multiple,
    ...other,
  });

  const isArray = Array.isArray(value) && multiple;

  const hasFile = !isArray && !!value;
  const hasFiles = isArray && !!value.length;

  const hasError = isDragReject || !!error;

  return (
    <div className="relative">
      <div
        {...getRootProps()}
        className={clsx(
          "w-full p-5 border-1 rounded cursor-pointer",
          hasError && "border-red-accent bg-red-accent/5",
          isDragActive
            ? "border-blue-500"
            : "border-dashed border-background-hover",
          hasFile && "py-[30%]"
        )}
      >
        <input {...getInputProps()} />

        {hasFile && value instanceof File ? (
          <SingleFilePreview file={value} />
        ) : (
          <UploadPlaceholder />
        )}
      </div>

      {hasFile && onDelete && <DeleteButton onClick={onDelete} />}

      {hasError && helperText && (
        <Typography
          variant="span"
          className={clsx("mt-1", error && "text-red-500")}
        >
          {helperText}
        </Typography>
      )}
      {hasFiles && onRemove && (
        <MultiFilePreview files={value} onRemove={onRemove} />
      )}
    </div>
  );
}
