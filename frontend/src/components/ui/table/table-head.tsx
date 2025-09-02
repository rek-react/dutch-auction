import clsx from "clsx";
import { TableRow } from "./table-row";
import { HTMLAttributes } from "react";

export interface HeadCell {
  name: string;
  width?: number | string;
  align?: "left" | "center" | "right";
}

interface TableHeadProps extends HTMLAttributes<HTMLTableSectionElement> {
  headCells: HeadCell[];
}

export function TableHead({ headCells, ...other }: TableHeadProps) {
  return (
    <thead {...other} className={clsx("bg-background ", other.className)}>
      <TableRow className="border border-background-secondary">
        {headCells.map(({ name, width, align }, idx) => (
          <th
            key={idx}
            className={clsx(
              "px-4 py-3 font-semibold text-sm text-caption uppercase tracking-wider whitespace-nowrap",
              {
                "text-left": align === "left" || !align,
                "text-center": align === "center",
                "text-right": align === "right",
              }
            )}
            style={width ? { width } : undefined}
          >
            {name}
          </th>
        ))}
      </TableRow>
    </thead>
  );
}
