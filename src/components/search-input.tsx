"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export const SearchInput = ({ className }: { className?: string }) => {
  return (
    <div className={cn("w-full max-w-[600px] mx-auto relative")}>
      <input
        placeholder="Search waffles and Juices"
        className="peer h-9 w-full pl-3 pr-10 placeholder:text-sm outline-none rounded-md focus:ring focus-visible:ring-[1.5px] focus:ring-color_blue text-muted-foreground"
      />
      <button className="rounded-r-md size-9 bg-color_blue absolute right-0 top-0 grid place-content-center">
        <Search className="size-4" />
      </button>
    </div>
  );
};
