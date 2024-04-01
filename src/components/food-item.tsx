"use client";

import { Image } from "./image";
import { motion } from "framer-motion";
import { WhileInView } from "./while-in-view";
import { useWindowSize } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { caprasimo, potta_one } from "@/fonts";

interface FoodItemProps {
  image: string;
  name: string;
  price: number;
}

export const FoodItem = ({ image, name, price }: FoodItemProps) => {
  const { width } = useWindowSize();
  const md = width >= 768;
  const lg = width >= 1024;

  return (
    <WhileInView
      y={md ? 0 : 100}
      x={md ? -150 : lg ? 400 : 0}
      duration={0.6}
      amount={0.2}
      className="flex flex-col items-center w-full max-w-[350px] mx-auto"
    >
      <Image src={image} alt={name} />
      <h3
        className={cn(
          potta_one.className,
          "font-extrabold sm:text-lg md:text-xl mt-8"
        )}
      >
        {name}
      </h3>
      <p
        className={cn(
          caprasimo.className,
          "font-bold sm:text-lg md:text-xl mt-3"
        )}
      >
        {price} BDT
      </p>
    </WhileInView>
  );
};
