"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Search } from "lucide-react";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { SearchInput } from "./search-input";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

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
    <section className="md:hidden">
      {!open && (
        <Button onClick={handleOpen} size="icon" variant="ghost">
          <Search className="size-5" />
        </Button>
      )}
      <motion.div
        ref={targetRef}
        variants={{
          open: {
            y: 0,
          },
          closed: {
            y: "-100%",
          },
        }}
        initial="closed"
        transition={{ duration: 0.5 }}
        animate={open ? "open" : "closed"}
        className="fixed flex h-[65px] items-center gap-2 bg-background z-50 inset-x-0 top-0 px-4"
      >
        <Button onClick={handleClose} size="icon" variant="ghost">
          <ArrowLeft className="size-5" />
        </Button>
        <SearchInput isFocused={focus} showPopup={open} />
      </motion.div>
    </section>
  );
};
