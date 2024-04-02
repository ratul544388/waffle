"use client";

import { Image } from "@/components/image";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";

interface ImagesZoomInOutProps {}

const variants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  exit: { scale: 0 },
};

export const ImagesZoomInOut = ({}: ImagesZoomInOutProps) => {
  const images = ["/foods/1.png", "/foods/2.png", "/foods/3.png"];
  const [activeIndex, setActiveIndex] = useState(0);

  const { ref, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>;

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && isIntersecting) {
        intervalId = setInterval(() => {
          setActiveIndex((prev) => (prev + 1) % images.length);
        }, 3000);
      } else {
        clearInterval(intervalId);
      }
    };

    window.addEventListener("blur", () => clearInterval(intervalId));
    window.addEventListener("focus", handleVisibilityChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    handleVisibilityChange(); // Call the function initially

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("blur", () => clearInterval(intervalId));
      window.removeEventListener("focus", handleVisibilityChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [images.length, isIntersecting]);

  return (
    <div
      ref={ref}
      className="relative w-full max-w-[250px] aspect-square flex items-center justify-center"
    >
      <AnimatePresence>
        <motion.div
          key={activeIndex}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.5 }}
          className={cn(
            "w-full max-w-[200px] sm:max-w-[250px] absolute aspect-square",
            !isIntersecting && "hidden"
          )}
        >
          <Image src={images[activeIndex]} alt="Waffle item" className="" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

