"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

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
    header: "Sub_Type",
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.original.companyId ? "bg-green-500" : "bg-orange-500"
        )}
      >
        {row.original.companyId ? "Company" : "Individual"}
      </Badge>
    ),
  },
];
