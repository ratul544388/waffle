"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const ScrollBarProvider = () => {
  const [height, setHeight] = useState(0);
  const [minHeight, setMinHeight] = useState(0);
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const translateY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const pathname = usePathname();
  const y = useMotionValue(0);

  useEffect(() => {
    const clientHeight = document.body.clientHeight;
    const innerHeight = window.innerHeight;
    const scrollbarHeight = (innerHeight * 0.6) / (clientHeight / innerHeight);
    setHeight(scrollbarHeight);
    setMinHeight(100);
  }, [pathname]);

  return (
    <motion.span
      style={{ top, translateY, height, minHeight, y }}
      className="fixed cursor-grab z-50 right-0 top-0 w-1 xs:w-2 sm:w-2.5 rounded-full bg-neutral-600"
      onDrag={() => {
        console.log(y.get());
      }}
      dragConstraints={{
        top: 0,
        // bottom: 0,
      }}
      drag="y"
    />
  );
};
