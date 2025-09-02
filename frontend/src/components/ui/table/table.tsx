import clsx from "clsx";
import { PropsWithChildren, TableHTMLAttributes } from "react";

export function Table({
  children,
  ...other
}: PropsWithChildren<TableHTMLAttributes<HTMLTableElement>>) {
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table
        {...other}
        className={clsx("table-auto w-full border-collapse", other.className)}
      >
        {children}
      </table>
    </div>
  );
}
