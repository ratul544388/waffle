"use client";

import { Button } from "@/components/ui/button";
import { extras } from "@/constants";
import { formatPrice } from "@/lib/utils";

interface SelectExtraProps {
  value: string[];
  onChange: (value: string[]) => void;
  disabled?: boolean;
}

export const SelectExtra = ({
  value,
  onChange,
  disabled,
}: SelectExtraProps) => {
  const onSelect = (selectedItem: string) => {
    let newValue: string[] = [];
    if (value.includes(selectedItem)) {
      newValue = value.filter((item) => item !== selectedItem);
    } else {
      newValue = [...value, selectedItem];
    }
    onChange(newValue);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap p-3 rounded-md border ">
      {extras.map(({ label, price }) => (
        <Button
          disabled={disabled}
          type="button"
          onClick={() => onSelect(label)}
          variant={value.includes(label) ? "green" : "outline"}
          size="xs"
          key={label}
        >
          {label} +{formatPrice(price)}
        </Button>
      ))}
    </div>
  );
};
