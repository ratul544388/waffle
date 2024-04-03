"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "./ui/button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "green" | "outline" | "white"
}

export const MotionButton = ({
  children,
  className,
  variant,
  onClick,
  ...props
}: ButtonProps) => {
  return (
    <Button asChild {...props} variant={variant}>
      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn('font-lemon', className)}
      >
        {children}
      </motion.button>
    </Button>
  );
};
