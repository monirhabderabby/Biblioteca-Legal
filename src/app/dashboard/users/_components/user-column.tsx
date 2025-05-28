"use client";

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
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
    header: "Action",
    cell: () => (
      <Button
        size="icon"
        variant="outline"
        className="text-primary hover:text-primary/80"
      >
        <Trash />
      </Button>
    ),
  },
];
