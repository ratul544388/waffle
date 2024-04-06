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
      className="fixed inset-0 h-[450vh] sm:h-[300vh] opacity-0 -z-10"
    >
      <Image
        src="/artboards/mobile-1.png"
        alt="Mobile artbaord"
        className="h-[170vh] sm:hidden object-cover mt-[30vh]"
      />
      <Image
        src="/artboards/mobile-2.png"
        alt="Mobile artbaord"
        className="h-[250vh] sm:hidden object-cover mt-[50vh]"
      />
      <Image
        src="/artboards/desktop-1.png"
        alt="Mobile artbaord"
        className="h-[130vh] hidden sm:block object-cover mt-[30vh]"
      />
      <Image
        src="/artboards/desktop-2.png"
        alt="Mobile artbaord"
        className="h-[150vh] hidden sm:block object-cover mt-[50vh]"
      />
    </motion.div>
  );
};
