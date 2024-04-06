"use client";

import { Check, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCartStore } from "@/hooks/use-cart";

interface QuantitySelectProps {
  quantity: number;
  onChange: (quantity: number) => void;
}

export const QuantitySelect = ({ quantity, onChange }: QuantitySelectProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="xs" variant="outline" className="gap-3 text-muted-foreground">
          <span>Qty:</span>
          {quantity}
          <ChevronDown className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit">
        {Array.from({ length: 10 }).map((_, index) => (
          <DropdownMenuItem onClick={() => onChange(index + 1)} key={index}>
            {index + 1}
            {quantity === index + 1 && (
              <Check className="size-4 text-muted-foreground ml-auto" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
