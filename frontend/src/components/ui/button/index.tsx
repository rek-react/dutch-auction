import { PropsWithChildren, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "contained" | "outlined";
type Size = "small" | "standart";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  contained: "bg-primary text-white",
  outlined: "border border-primary",
};

const sizeClasses: Record<Size, string> = {
  standart: "py-2 px-5 sm:py-3 sm:px-6 lg:py-4 lg:px-7",
  small: "py-2 px-2 sm:px-4 lg:py-2 lg:px-5",
};

export function Button({
  variant = "contained",
  size = "standart",
  isLoading,
  children,
  disabled,
  ...other
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      {...other}
      disabled={disabled || isLoading}
      className={clsx(
        "min-w-32 rounded-2xl",
        !(disabled || isLoading) &&
          "transition-transform duration-200 ease-in-out hover:scale-95",
        variantClasses[variant],
        sizeClasses[size],
        disabled || isLoading ? "opacity-60 cursor-default" : "cursor-pointer",
        other.className
      )}
    >
      {isLoading ? (
        <span className="flex justify-center items-center">
          <span className="inline-block w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
        </span>
      ) : (
        <span
          className={clsx(
            "inline-flex justify-center items-center text-center font-semibold"
          )}
        >
          {children}
        </span>
      )}
    </button>
  );
}
