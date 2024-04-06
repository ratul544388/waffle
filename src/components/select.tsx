"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Select as CustomSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SelectProps {
  options: string[];
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  label: string;
  required?: boolean;
}

export const Select = ({
  label,
  options,
  value,
  onChange,
  disabled,
  required = true,
}: SelectProps) => {
  const [open, setOpen] = useState(false);
  return (
    <CustomSelect
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <SelectTrigger className="relative h-[3.2rem] pt-4 bg-secondary hover:bg-accent">
        <SelectValue />
        <motion.span
          variants={{ closed: { y: "-50%" }, open: { top: 12 } }}
          initial="closed"
          animate={open || value ? "open" : "closed"}
          className={cn(
            "absolute text-muted-foreground font-medium top-1/2",
            (open || value) && "text-xs"
          )}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </motion.span>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </CustomSelect>
  );
};
