import { PropsWithChildren, HTMLAttributes, ElementType } from "react";
import clsx from "clsx";

type Variant = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: Variant;
}

const variantClasses: Record<Variant, string> = {
  h1: "text-4xl sm:text-5xl lg:text-6xl",
  h2: "text-3xl sm:text-4xl lg:text-5xl",
  h3: "text-2xl sm:text-3xl lg:text-4xl",
  h4: "text-xl sm:text-2xl lg:text-3xl",
  p: "text-base",
  span: "text-sm",
};
export function Typography({
  variant = "p",
  children,
  ...other
}: PropsWithChildren<TypographyProps>) {
  const Component: ElementType = variant;
  return (
    <Component
      {...other}
      className={clsx(variantClasses[variant], other.className)}
    >
      {children}
    </Component>
  );
}
