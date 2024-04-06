"use client";

import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export const AdminSearchInput = () => {
  const [value, setValue] = useState("");
  const [debouncedValue] = useDebounceValue(value, 500);
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    if (debouncedValue) {
      router.push(`${pathname}?q=${debouncedValue}`);
    } else {
      router.push(pathname);
    }
  }, [debouncedValue, pathname, router]);

  return (
    <div className={cn("w-full max-w-[600px] mx-auto relative")}>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search waffles and Juices"
        className="peer h-9 w-full pl-3 pr-10 placeholder:text-sm outline-none rounded-md focus:ring focus-visible:ring-[1.5px] focus:ring-color_blue text-muted-foreground"
      />
      <button
        type="submit"
        className="rounded-r-md size-9 bg-color_blue absolute right-0 top-0 grid place-content-center"
      >
        <Search className="size-4" />
      </button>
    </div>
  );
};
