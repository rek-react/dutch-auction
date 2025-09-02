import clsx from "clsx";
import { PropsWithChildren, TdHTMLAttributes } from "react";

export function TableCell({
  children,
  ...other
}: PropsWithChildren<TdHTMLAttributes<HTMLTableDataCellElement>>) {
  return (
    <td {...other} className={clsx("px-4 py-2 text-white", other.className)}>
      {children}
    </td>
  );
}
