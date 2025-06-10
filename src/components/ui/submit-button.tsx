import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Optional: your class merging utility
import { Loader2 } from "lucide-react";

interface SubmitButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

export const SubmitButton = ({
  children,
  isLoading = false,
  className,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn("w-full ", className)}
      disabled={isLoading}
    >
      {children}
      {isLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin" />}
    </Button>
  );
};
