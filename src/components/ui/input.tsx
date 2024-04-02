import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  phone?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, phone, ...props }, ref) => {
    const value = props.value;
    return (
      <div className="relative">
        <input
          placeholder=" "
          type={type}
          className={cn(
            "peer flex h-[3.2rem] bg-secondary hover:bg-gray-200/60 focus:bg-secondary w-full rounded-md border border-input px-3 py-1 pt-3 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-emerald-400 disabled:cursor-not-allowed disabled:opacity-50",
            phone && "pl-16",
            className
          )}
          ref={ref}
          {...props}
        />
        <Label
          className={cn(
            "absolute text-muted-foreground left-3 top-1/2 -translate-y-1/2 peer-focus:top-3 peer-focus:text-xs transition-all",
            value && "top-3 text-xs",
            phone && "top-3 text-xs"
          )}
        >
          {label}
        </Label>
        {phone && (
          <p className="pl-3 absolute top-1/2 -translate-y-1/2 mt-1">+880</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };