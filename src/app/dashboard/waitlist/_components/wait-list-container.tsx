"use client";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { UserQue } from "@prisma/client";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { waitListColumn } from "./wait-list-column";

export interface WaitlistContainerProps {
  data: UserQue[];
}

const WaitListContainer = ({ data }: WaitlistContainerProps) => {
  return (
    <div>
      <TableContainer data={data} columns={waitListColumn} />
    </div>
  );
};

export default WaitListContainer;

interface TableProps {
  data: UserQue[];
  columns: ColumnDef<UserQue>[];
}

const TableContainer = ({ data, columns }: TableProps) => {
  const table = useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <div className="bg-white">
        <DataTable table={table} columns={columns} />
      </div>

      <div className="mt-4 w-full ">
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="text-primary"
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="text-primary"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
