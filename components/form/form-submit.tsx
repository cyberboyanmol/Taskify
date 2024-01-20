"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitPrrops {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "primary";
}

export const FormSubmit = ({
  disabled,
  className,
  children,
  variant,
}: FormSubmitPrrops) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      size={"sm"}
      disabled={pending || disabled}
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
