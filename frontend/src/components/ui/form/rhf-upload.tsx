"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Upload } from "../upload";
import { FileWithPath } from "react-dropzone";

interface RHFUploadProps {
  name: string;
  multiple?: boolean;
  onDelete?: () => void;
  onRemove?: (file: FileWithPath) => void;
  placeholder?: string;
  className?: string;
  helperText?: string;
}

export function RHFUpload({
  name,
  multiple,
  helperText,
  ...other
}: RHFUploadProps) {
  const { control, setValue } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const uploadProps = {
          multiple,
          accept: { "image/png": [], "image/jpeg": [] },
          error: !!error,
          helperText: error?.message ?? helperText,
        };

        const onDrop = (acceptedFiles: FileWithPath[]) => {
          const value = multiple
            ? [...(field.value || []), ...acceptedFiles]
            : acceptedFiles[0];

          setValue(name, value, { shouldValidate: true });
        };

        return (
          <Upload
            {...uploadProps}
            value={field.value}
            onDrop={onDrop}
            {...other}
          />
        );
      }}
    />
  );
}
