import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/libs/utils";
import React from "react";
import { FieldError, UseFormReturn } from "react-hook-form";

interface SelectFormFieldProps {
  form: UseFormReturn<any>;
  name: string;
  placeholder: string;
  error: FieldError | undefined;
  className?: string;
  options: { label: string; value: string }[];
}

const SelectFormField: React.FC<SelectFormFieldProps> = ({
  form,
  name,
  placeholder,
  error,
  className,
  options,
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger
              className={cn(
                `h-12 bg-primary/5 border-primary/80 text-primary border-none hover:text-primary transition-colors ${
                  field.value === undefined && "text-muted-foreground"
                }`
              )}
            >
              <SelectValue placeholder={placeholder} className="capitalize" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {options.map((option, index) => (
              <SelectItem
                key={index}
                value={option.value}
                className="capitalize"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <FormMessage className="text-xs font-light" />
      </FormItem>
    )}
  />
);

export default SelectFormField;
