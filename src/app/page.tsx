"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Hero } from "./_components/hero";
import { Waffles } from "./_components/waffles";
import { wafflesItems, waffleStickItems } from "@/constants";
import { AddOns } from "./_components/add-ons";

export default function Home() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const transform = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);

  return (
    <main ref={scrollRef} className="h-[1000vh]">
      <Hero />
      <Waffles waffles={wafflesItems} title="Waffles"/>
      <Waffles waffles={waffleStickItems} title="Waffles on sticks"/>
      <AddOns/>
      <motion.div
        style={{ top: transform }}
        className="fixed h-[200vh] inset-x-0 -z-10"
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
