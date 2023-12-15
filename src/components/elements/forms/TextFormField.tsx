import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/libs/utils";
import React from "react";
import { FieldError, UseFormReturn } from "react-hook-form";

interface TextFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  placeholder: string;
  error: FieldError | undefined;
  className?: string;
  type?: string;
}

const TextFormField: React.FC<TextFormFieldProps> = ({
  form,
  name,
  placeholder,
  error,
  className,
  type = "text",
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Input
            {...field}
            placeholder={placeholder}
            type={type}
            className={cn(
              `h-12 bg-primary/5 border-primary/80 text-primary ${
                error
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-transparent"
              }`,
              className
            )}
          />
        </FormControl>
        <FormMessage className="text-xs font-light" />
      </FormItem>
    )}
  />
);

export default TextFormField;
