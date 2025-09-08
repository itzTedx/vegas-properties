import { Control, FieldValues, Path } from "react-hook-form";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { cn } from "@/lib/utils";

const formLabelBaseStyles = {
  base: cn("absolute block px-1 text-base", "cursor-text text-input", "origin-start transition-all"),
  input: cn("-translate-y-1/2 top-1/2"),
  textarea: cn("top-4"),
  focus: cn(
    "group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:font-medium group-focus-within:text-background group-focus-within:text-xs"
  ),
  filled: {
    input: cn(
      "has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-background has-[+input:not(:placeholder-shown)]:text-xs"
    ),
    textarea: cn(
      "has-[+textarea:not(:placeholder-shown)]:pointer-events-none has-[+textarea:not(:placeholder-shown)]:top-0 has-[+textarea:not(:placeholder-shown)]:cursor-default has-[+textarea:not(:placeholder-shown)]:font-medium has-[+textarea:not(:placeholder-shown)]:text-background has-[+textarea:not(:placeholder-shown)]:text-xs"
    ),
  },
};

interface FloatingLabelInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
  isTextarea?: boolean;
}

export function FloatingLabelInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  isTextarea = false,
}: FloatingLabelInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="sr-only">{label}</FormLabel>
          <FormControl>
            <div className="group relative">
              <FormLabel
                className={cn(
                  formLabelBaseStyles.base,
                  isTextarea ? formLabelBaseStyles.textarea : formLabelBaseStyles.input,
                  formLabelBaseStyles.focus,
                  isTextarea ? formLabelBaseStyles.filled.textarea : formLabelBaseStyles.filled.input
                )}
                htmlFor={name}
              >
                <span className={cn("inline-flex bg-card px-1 text-muted-foreground")}>{label}</span>
              </FormLabel>
              {isTextarea ? (
                <Textarea className={cn("min-h-[120px] resize-none")} placeholder="" {...field} id={name} />
              ) : (
                <Input placeholder="" type={type} {...field} id={name} />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
