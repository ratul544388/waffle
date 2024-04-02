"use client";

import { cn } from "@/lib/utils";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { Image } from "./image";
import { WhileInView } from "./while-in-view";
import { motion, useAnimation } from "framer-motion";
import { Button } from "./button";
import { useModalStore } from "@/hooks/use-modal-store";
import { useRef } from "react";

const variants = {
  initial: {
    height: 0,
  },
  animate: {
    height: 150,
  },
};

interface FoodItemProps {
  image: string;
  name: string;
  price: number;
}

export const FoodItem = ({ image, name, price }: FoodItemProps) => {
  const { onOpen } = useModalStore();
  const animation = useAnimation();
  const { width } = useWindowSize();
  const targetRef = useRef(null);
  useOnClickOutside(targetRef, () => animation.start("initial"));

  const md = width >= 768;
  const lg = width >= 1024;

  return (
    <WhileInView
      y={md ? 0 : 100}
      x={md ? -150 : lg ? 400 : 0}
      duration={0.6}
      amount={0.2}
    >
      <motion.div
        initial="initial"
        onMouseEnter={() => animation.start("animate")}
        onMouseLeave={() => animation.start("initial")}
        animate={animation}
        onClick={() => animation.start("animate")}
        className="flex text-white relative overflow-hidden flex-col items-center w-full max-w-[350px] mx-auto"
      >
        <Image src={image} alt={name} />
        <h3
          className={cn(
            "font-extrabold uppercase sm:text-lg md:text-xl mt-8 font-lemon"
          )}
        >
          {name}
        </h3>
        <p
          className={cn("font-bold sm:text-lg md:text-xl mt-3 font-caprasimo")}
        >
          {price} BDT
        </p>
        <motion.div
          variants={variants}
          className="absolute inset-x-0 flex items-center flex-col gap-3 bg-orange-500 px-5 rounded-xl bottom-0"
        >
          <h3 className="text-lg font-bold mt-5">{name}</h3>
          <p className="text-lg font-bold">{price} BDT</p>
          <div className="flex items-center gap-3.5">
            <Button onClick={() => onOpen("orderModal", { name })}>
              Order now
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </WhileInView>
  );
};
