"use client";

import { useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const transform = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <main ref={scrollRef} className="h-[1000vh]">
      <div></div>
      <div className="bg-color_blue h-screen w-full flex items-center justify-center">
        <div className="size-80 relative">
          <Image
            src="/food-1.png"
            alt="Food image"
            fill
            className="object-cover"
          />
        </div>
      </div>
      <motion.div
        style={{ top: transform }}
        className="fixed h-[200vh] w-full -z-10"
      >
        <Image
          src="/artboard-1.png"
          alt="Art board"
          fill
          className="object-cover"
        />
      </motion.div>
    </main>
  );
}
