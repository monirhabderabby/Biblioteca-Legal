"use client";

import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import UserAction from "./user-action";

export const manageUsersColumn: ColumnDef<User>[] = [
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
  {
    header: "Action",
    cell: () => <UserAction />,
  },
];
