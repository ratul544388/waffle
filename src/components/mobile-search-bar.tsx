"use client";

import { ArrowLeft, ChevronRight, Search } from "lucide-react";
import { Container } from "./container";
import { SearchInput } from "./search-input";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";

interface MobileSearchBarProps {}

export const MobileSearchBar = ({}: MobileSearchBarProps) => {
  const [open, setOpen] = useState(false);
  const targetRef = useRef(null);
  const [focus, setFocus] = useState(false);

  useOnClickOutside(targetRef, () => handleClose());

  const handleClose = () => {
    setOpen(false);
    setFocus(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setFocus(true);
  };

  return (
    <section
      ref={targetRef}
      className={cn(
        "sm:hidden",
        open && "fixed bg-background h-16 z-20 inset-x-0 top-0 px-5"
      )}
    >
      {!open && (
        <Button onClick={handleOpen} size="icon" variant="ghost">
          <Search className="size-5" />
        </Button>
      )}
      {open && (
        <div className="h-full flex items-center justify-center gap-2 w-full">
          <Button onClick={handleClose} size="icon" variant="ghost">
            <ArrowLeft className="size-5" />
          </Button>
          <SearchInput isFocused={focus} />
        </div>
      )}
    </section>
  );
};
