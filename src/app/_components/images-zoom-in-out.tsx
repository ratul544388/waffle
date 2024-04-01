"use client";

import { Image } from "@/components/image";
import { motion } from "framer-motion";

interface ImagesZoomInOutProps {}

export const ImagesZoomInOut = ({}: ImagesZoomInOutProps) => {
  const images = ["/foods/1.png", "/foods/2.png", "/foods/3.png"];
  return (
    <div className="relative w-full max-w-[250px] aspect-square flex items-center justify-center">
      {images.map((image, index) => (
        <motion.div
          variants={{
            initial: { scale: index === 0 ? 1 : 0 },
            animate: { scale: [0, 1, 0] },
          }}
          initial="initial"
          animate="animate"
          transition={{ repeat: Infinity, delay: index * 0.7, duration: 2 }}
          key={index}
          className="w-full max-w-[200px] sm:max-w-[250px] absolute aspect-square"
        >
          <Image key={index} src={image} alt="Waffle item" className="" />
        </motion.div>
      ))}
    </div>
  );
};
