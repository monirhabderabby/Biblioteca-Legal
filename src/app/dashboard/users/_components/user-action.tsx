"use client";
import { holdSubscription } from "@/actions/subscription/hold";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Trash } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  user: User;
}

const UserAction = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onHold = () => {
    startTransition(() => {
      holdSubscription().then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        toast.success(res.message);
        setOpen(false);
      });
    });
  };
  return (
    <>
      {!user.companyId && (
        <Button
          size="default"
          variant="outline"
          className="text-primary hover:text-primary/80"
          onClick={() => setOpen((p) => !p)}
        >
          <Trash /> Cancel
        </Button>
      )}
      <AlertModal
        title="Are you sure want to hold this subscription?"
        isOpen={open}
        loading={pending}
        onClose={() => setOpen(false)}
        onConfirm={onHold}
      />
    </>
  );
};

export default UserAction;
