"use client";

import { Controller, useFormContext } from "react-hook-form";
import clsx from "clsx";
import { HTMLInputTypeAttribute, TextareaHTMLAttributes } from "react";
import { Typography } from "../typography";
import {
  transformValue,
  transformValueOnBlur,
  transformValueOnChange,
} from "minimal-shared";

interface RHFTextFieldProps {
  name: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  integerOnly?: boolean;
}

export function RHFTextField({
  name,
  label,
  type = "text",
  placeholder,
  className,
  helperText,
  multiline = false,
  rows = 4,
  integerOnly,
  ...other
}: RHFTextFieldProps) {
  const { control } = useFormContext();

  const isNumberType = type === "number";

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        const commonProps = {
          ...field,
          id: name,
          placeholder,
          className: clsx(
            "bg-white text-background w-full px-4 py-2 rounded-2xl focus:outline-none focus:ring-2",
            error ? "focus:ring-red-500" : "focus:ring-primary",
            className
          ),
          ...other,
        };

        return (
          <div className="w-full">
            {label && (
              <label
                htmlFor={name}
                className="inline-block mb-1 text-sm font-medium text-white"
              >
                {label}
              </label>
            )}

            {multiline ? (
              <textarea
                {...commonProps}
                value={field.value ?? ""}
                rows={rows}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={(e) => field.onBlur()}
                className={clsx(commonProps.className, "resize-none")}
              />
            ) : (
              <input
                {...commonProps}
                value={isNumberType ? transformValue(field.value) : field.value}
                type={isNumberType ? "text" : type}
                onChange={(event) => {
                  let value = event.target.value;

                  if (isNumberType && integerOnly) {
                    value = value.replace(/\D/g, "");
                  } else if (isNumberType) {
                    value = transformValueOnChange(value);
                  }

                  field.onChange(value);
                }}
                onBlur={(event) => {
                  let value: string | number = event.target.value;

                  if (isNumberType && integerOnly) {
                    value = value ? String(Math.floor(Number(value))) : "";
                  } else if (isNumberType) {
                    value = transformValueOnBlur(value);
                  }

                  field.onChange(value);
                }}
                autoComplete="off"
              />
            )}

            <Typography
              variant="span"
              className={clsx("mt-1", error && "text-red-500")}
            >
              {error?.message ?? helperText}
            </Typography>
          </div>
        );
      }}
    />
  );
}
