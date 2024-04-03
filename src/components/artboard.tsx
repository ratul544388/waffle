"use client";
import { motion } from "framer-motion";
import { useScroll, useTransform } from "framer-motion";
import { Image } from "./image";

export const Artboard = () => {
  const { scrollYProgress } = useScroll();
  const transform = useTransform(scrollYProgress, [0, 1], ["0", "-100%"]);
  return (
    <motion.div
      animate={{ opacity: [0, 1] }}
      style={{ translateY: transform }}
      className="fixed inset-0 h-[250vh] opacity-0 -z-10"
    >
      <Image
        src="/artboards/mobile.png"
        alt="Mobile artbaord"
        className="h-screen sm:hidden object-cover mt-[30vh]"
      />
      <Image
        src="/artboards/desktop.png"
        alt="Mobile artbaord"
        className="h-screen hidden sm:block object-cover mt-[30vh]"
      />
    </motion.div>
  );
};
