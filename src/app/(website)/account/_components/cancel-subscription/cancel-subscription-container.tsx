"use client";

import { cancelSubscriptionAction } from "@/actions/subscription/cancel";
import AlertModal from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const CancelSubscriptionContainer = () => {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const onCancelSubscription = () => {
    startTransition(() => {
      cancelSubscriptionAction().then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // manejar éxito
        toast.success(res.message);
        setOpen(false);
      });
    });
  };
  return (
    <div>
      <Card className="shadow-none">
        <CardHeader>
          <div className="flex flex-col items-start justify-between">
            <CardTitle className="text-xl font-semibold">
              Cancelar suscripción
            </CardTitle>
            <CardDescription>
              Al cancelar la suscripción perderás acceso a las funciones
              premium. Puedes volver a suscribirte en cualquier momento.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => setOpen((p) => !p)}>
            Cancelar suscripción
          </Button>
        </CardContent>
      </Card>

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={pending}
        onConfirm={onCancelSubscription}
      />
    </div>
  );
};

export default CancelSubscriptionContainer;
