"use client";

import { removeEmployee } from "@/actions/companies/delete";
import AlertModal from "@/components/ui/alert-modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Trash2, XCircle } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface UserCardProps {
  profileImage?: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  email: string;
  userId: string;
  companyId: string;
}

export default function EmployeeCard({
  profileImage,
  firstName,
  lastName,
  emailVerified,
  email,
  userId,

  companyId,
}: UserCardProps) {
  const [open, setOpen] = useState(false);
  const [pending, startTranistion] = useTransition();

  const onRemoveEmployee = () => {
    startTranistion(() => {
      removeEmployee({
        userId,
        companyId,
      }).then((res) => {
        if (!res.success) {
          toast.error(res.message);
          return;
        }

        // handle success
        toast.success(res.message);
        setOpen(false);
      });
    });
  };
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={profileImage || "/placeholder.jpg"}
                  alt={`${firstName} ${lastName}`}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">
                  {firstName} {lastName}
                </h3>
                <p className="text-[14px]">{email}</p>
                <div className="flex items-center space-x-2">
                  {emailVerified ? (
                    <Badge variant="secondary" className="text-xs">
                      <CheckCircle className="w-3 h-3 mr-1 text-green-600" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-xs">
                      <XCircle className="w-3 h-3 mr-1 text-red-500" />
                      Unverified
                    </Badge>
                  )}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(true)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove user</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      <AlertModal
        loading={pending}
        onClose={() => setOpen(false)}
        onConfirm={onRemoveEmployee}
        isOpen={open}
      />
    </>
  );
}
