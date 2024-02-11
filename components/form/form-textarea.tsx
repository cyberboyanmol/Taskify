"use client";

import { KeyboardEventHandler, forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { FormErrors } from "@/components/form/form-errors";
import { Textarea } from "@/components/ui/textarea";

interface FormTextAreaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[]> | undefined;
  className?: string;
  defaultValue?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  rows?: number;
}

export const FormTextArea = forwardRef<HTMLTextAreaElement, FormTextAreaProps>(
  (
    {
      id,
      rows,
      label,
      disabled,
      placeholder,
      required,
      errors,
      className,
      defaultValue,
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2 w-full">
        <div className="space-y-1 w-full">
          {label ? (
            <Label
              htmlFor={id}
              className=" text-xs font-semibold text-neutral-700"
            >
              {label}
            </Label>
          ) : null}
          <Textarea
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            rows={rows}
            onKeyDown={onKeyDown}
            onClick={onClick}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            disabled={pending || disabled}
            className={cn(
              "resize-none h-auto focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0  outline-none shadow-sm",
              className
            )}
            aria-describedby={`${id}-error`}
          />
        </div>
        {/* input Error */}
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);
FormTextArea.displayName = "FormTextArea";
