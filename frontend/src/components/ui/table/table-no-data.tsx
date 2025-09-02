import { EmptyState } from "@/components/empty-state";
import { TableCell } from "./table-cell";
import { TableRow } from "./table-row";

export function TableNoData() {
  return (
    <TableRow>
      <TableCell colSpan={12}>
        <EmptyState title="No data here yet" />
      </TableCell>
    </TableRow>
  );
}
