import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/libs/utils";
import React from "react";
import { FieldError, UseFormReturn } from "react-hook-form";

interface TextareaFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  placeholder: string;
  error: FieldError | undefined;
  className?: string;
}

const TextareaFormField: React.FC<TextareaFormFieldProps> = ({
  form,
  name,
  placeholder,
  error,
  className,
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <Textarea
            {...field}
            placeholder={placeholder}
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

export default TextareaFormField;
