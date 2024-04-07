"use client";

import { cn, formatPrice } from "@/lib/utils";
import { Extra } from "@/types";
import { WhileInView } from "./while-in-view";

interface AddOnsProps {
  extras: Extra[];
  className?: string;
}

export const AddOns = ({ extras, className }: AddOnsProps) => {
  return (
    <WhileInView
      y={50}
      className={cn(
        "border-4 h-fit border-accent w-fit p-5 px-8 rounded-md mx-auto sm:mx-0",
        className
      )}
    >
      <h2 className="font-bungee_spice text-3xl whitespace-nowrap">Add-Ons</h2>
      <ul className="mt-3 space-y-2 whitespace-nowrap">
        {extras.map(({ label, price }) => (
          <li key={label} className="font-bold flex items-center gap-2">
            <p className="font-lemon font-semibold">{label} - </p>
            <p className="font-inetr font-bold">{formatPrice(price)}</p>
          </li>
        ))}
      </ul>
    </WhileInView>
  );
};
