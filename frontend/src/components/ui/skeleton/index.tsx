import clsx from "clsx";
import React, { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
  variant?: "text" | "rectangular" | "circular";
}

export function Skeleton({
  width,
  height,
  className,
  variant = "rectangular",
  ...other
}: SkeletonProps) {
  const classes = clsx(
    "bg-gray-500 relative overflow-hidden animate-pulse",
    variant === "text" && "rounded w-full h-5",
    variant === "circular" && "rounded-full",
    variant === "rectangular" && "rounded-2xl",
    className
  );

  return (
    <div
      className={classes}
      style={{
        width: width ?? undefined,
        height: height ?? undefined,
      }}
      {...other}
    />
  );
}
