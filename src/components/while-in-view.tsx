"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WhileInViewProps {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number;
  scale?: number;
  opacity?: number;
  delay?: number;
  duration?: number;
  amount?: number;
}

export const WhileInView = ({
  className,
  children,
  opacity = 0,
  scale = 1,
  x = 0,
  y = 0,
  delay,
  duration,
  amount,
}: WhileInViewProps) => {
  return (
    <motion.div
      initial={{ x, y, scale, opacity }}
      whileInView={{ x: 0, y: 0, scale: 1, opacity: 1 }}
      transition={{ delay, duration }}
      viewport={{ once: true, amount }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};
