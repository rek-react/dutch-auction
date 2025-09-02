import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

export function TableRow({
  children,
  ...other
}: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>) {
  return (
    <tr {...other} className={clsx(other.className)}>
      {children}
    </tr>
  );
}
