"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, onClick }: ButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("bg-color_green rounded-md px-4 h-9 text-orange-950 font-caprasimo", className)}
    >
      {children}
    </motion.button>
  );
};
