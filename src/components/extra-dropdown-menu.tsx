"use client";

import { extras } from "@/constants";
import { Check, PlusCircle } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Extra } from "@/types";

interface ExtraDropdownMenuProps {
  value: Extra[];
  onChange: (value: Extra[]) => void;
}

export const ExtraDropdownMenu = ({
  value,
  onChange,
}: ExtraDropdownMenuProps) => {
  const isSelected = (selectedItem: Extra) => {
    return value.some((item) => item.label === selectedItem.label);
  };

  const handleSelect = (selectedItem: Extra) => {
    let newValue: Extra[] = [];
    if (isSelected(selectedItem)) {
      newValue = value.filter((item) => item.label !== selectedItem.label);
    } else {
      newValue = [...value, selectedItem];
    }
    onChange(newValue);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="xs" className="text-muted-foreground">
          Add Extra
          {!!!value.length && (
            <PlusCircle className="size-4 text-muted-foreground" />
          )}
          {value.length === 1 && (
            <span className="text-xs font-normal bg-secondary rounded-sm px-1 py-0.5">
              {value[0].label}
            </span>
          )}
          {value.length > 1 && (
            <span className="text-xs px-1.5 py-0.5 rounded-sm bg-secondary">
              +{value.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {extras.map((item) => (
          <DropdownMenuItem
            onClick={() => handleSelect(item)}
            key={item.label}
            className="gap-4"
          >
            {item.label} +{item.price}
            {isSelected(item) && (
              <span className="p-0.5 ml-auto bg-green-600 rounded-full">
                <Check className="size-4" />
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
