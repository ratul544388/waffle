"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion, stagger } from "framer-motion";

interface BreadCrumbsProps {
  items: {
    label: string;
    href?: string;
  }[];
  animate?: boolean;
}

export const BreadCrumbs = ({ items, animate = true }: BreadCrumbsProps) => {
  return (
    <nav className="flex items-center gap-2">
      <ul className="flex items-center gap-2 text-sm font-medium truncate">
        {items.map(({ label, href }, index) => (
          <motion.li
            variants={{
              animate: {
                opacity: [0, 1],
                x: [-50, 0],
                transition: { delay: index * 0.08, duration: 0.5 },
              },
            }}
            animate={animate && "animate"}
            key={label}
            className={cn("flex items-center gap-2", animate && "opacity-0")}
          >
            <Link
              href={href || ""}
              className={cn(
                "peer text-muted-foreground hover:text-foreground transition-colors py-2 line-clamp-1",
                !href && "pointer-events-none text-foreground"
              )}
            >
              {label}
            </Link>
            <ChevronRight
              className={cn(
                "size-3.5 text-muted-foreground peer-hover:text-foreground peer-hover:translate-x-0.5 transition duration-300",
                !href && "hidden"
              )}
            />
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};
