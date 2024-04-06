"use client";
import { motion } from "framer-motion";
interface SearchLoaderProps {}

export const SearchLoader = ({}: SearchLoaderProps) => {
  return (
    <div className="absolute top-0 inset-0 h-[3px]">
      <motion.span
        variants={{
          // initial: { left: "-100%", transition: { duration: 0.0001 } },
          animate: {
            left: "100%",
            transition: {
              repeat: Infinity,
              duration: 1,
            },
          },
        }}
        // initial="initial"
        animate="animate"
        // exit="exit"
        className="h-full -left-full absolute bg-muted-foreground rounded-full w-full"
      />
    </div>
  );
};
