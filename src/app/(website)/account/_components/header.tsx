"use client";
import { Button } from "@/components/ui/button";
import { useProfileEditState } from "@/store/account";
import { Pencil, Save } from "lucide-react";

const ProfileHeader = () => {
  const { open, setopen } = useProfileEditState();
  return (
    <div className="flex items-start justify-between">
      <h1 className="text-black font-semibold text-[22px] md:text-[26px] lg:text-[32px] ">
        User Information
      </h1>

      <Button onClick={() => setopen(!open)}>
        {open ? (
          <>
            <Save /> Save
          </>
        ) : (
          <>
            <Pencil /> Edit
          </>
        )}
      </Button>
    </div>
  );
};

export default ProfileHeader;
