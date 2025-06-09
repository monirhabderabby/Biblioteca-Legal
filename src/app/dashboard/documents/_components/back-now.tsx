"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackNow = () => {
  const router = useRouter();
  return (
    <Button variant="link" onClick={() => router.back()}>
      <ArrowLeft /> Back Now
    </Button>
  );
};

export default BackNow;
