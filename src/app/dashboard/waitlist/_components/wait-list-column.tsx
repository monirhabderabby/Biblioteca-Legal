"use client";

import { UserQue } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

export const waitListColumn: ColumnDef<UserQue>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    header: "Name",
    cell: ({ row }) => (
      <p>{`${row.original.first_name} ${row.original.last_name}`}</p>
    ),
  },
  {
    header: "Email",
    cell: ({ row }) => <p>{row.original.email}</p>,
  },
  {
    header: "Joined",
    cell: ({ row }) => (
      <p>{moment(row.original.createdAt).format("MMM D, YYYY")}</p>
    ),
  },
];
