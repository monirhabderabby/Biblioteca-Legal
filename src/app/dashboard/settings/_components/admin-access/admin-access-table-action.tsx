"use client";

import { removeAdmin } from "@/actions/auth/admin";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  user: User;
}

const AdminAccessTableAction = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTranistion] = useTransition();
  const queryClient = useQueryClient();

  const onRemoveAccess = () => {
    startTranistion(() => {
      removeAdmin(user.id).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success'
        toast.success(res.message);
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ["users"] });
      });
    });
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.role === "admin" ? (
          <DropdownMenuItem onClick={onRemoveAccess} disabled={pending} asChild>
            <Button variant="link" className="cursor-pointer">
              Remove Admin
            </Button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled={pending}>Make Admin</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminAccessTableAction;
