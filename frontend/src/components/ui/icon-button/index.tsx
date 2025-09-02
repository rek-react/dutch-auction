import { ButtonHTMLAttributes, PropsWithChildren } from "react";
import clsx from "clsx";

export function IconButton({
  children,
  className,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      type="button"
      className={clsx(
        "cursor-pointer rounded-full transition-all duration-200 ease-in-out hover:bg-background-secondary p-1",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
