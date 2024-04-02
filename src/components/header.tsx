"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Image } from "./image";
import { WhileInView } from "./while-in-view";

export const Header = () => {
  return (
    <header className="flex justify-center">
      <motion.span
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: -8, opacity: 1 }}
        viewport={{ once: true }}
        className="absolute inset-x-0 h-16 bg-color_pink sm:hidden"
      />
      <WhileInView
        y={-30}
        className="w-full hidden sm:flex items-center justify-center"
      >
        <Image
          src="/logos/desktop.png"
          alt="Logo"
          className={cn("aspect-[401/92] max-w-[200px] mt-3")}
        />
      </WhileInView>
      <WhileInView
        scale={0}
        delay={0.5}
        className="flex sm:hidden w-full items-center justify-center"
      >
        <Image src="/logo_mobile.webp" alt="Logo" className="w-20" />
      </WhileInView>
    </header>
  );
};
