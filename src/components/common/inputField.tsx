// components/ui/form-field.tsx
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
  field: any;
  label: string;
  type?: "text" | "password" | "email" | "number" | "tel";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  icon?: ReactNode;
  showPasswordToggle?: boolean;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

export function InputField({
  field,
  label,
  type = "text",
  placeholder,
  min,
  max,
  step,
  icon,
  showPasswordToggle,
  onTogglePassword,
  showPassword,
}: FormFieldProps) {
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <Field data-invalid={isInvalid}>
      <FieldLabel>{label}</FieldLabel>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">{icon}</div>
        )}

        <Input
          type={inputType}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          className={cn(icon && "pl-10", showPasswordToggle && "pr-10")}
        />

        {showPasswordToggle && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={onTogglePassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
