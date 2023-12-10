import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { cn } from "@/libs/utils";
import React from "react";
import { FieldError, UseFormReturn } from "react-hook-form";

interface SocialTextFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  placeholder: string;
  error: FieldError | undefined;
  icon?: string;
  className?: string;
  iconClassName?: string;
}

const SocialTextFormField: React.FC<SocialTextFormFieldProps> = ({
  form,
  name,
  placeholder,
  error,
  icon,
  className,
  iconClassName,
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormControl>
          <InputWithIcon
            {...field}
            icon={icon}
            placeholder={placeholder}
            className={cn(
              `h-12 bg-primary/5 border-primary/80 text-primary ${
                error
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-transparent"
              }`,
              className
            )}
            iconClassName={iconClassName}
          />
        </FormControl>
        <FormMessage className="text-xs font-light" />
      </FormItem>
    )}
  />
);

export default SocialTextFormField;
