import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

export function TableBody({
  children,
  ...other
}: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  return (
    <tbody
      {...other}
      className={clsx("border border-background-secondary", other.className)}
    >
      {children}
    </tbody>
  );
}
