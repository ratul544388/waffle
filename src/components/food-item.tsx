"use client";

import { foodTypes } from "@/constants";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { Image } from "./image";
import { WhileInView } from "./while-in-view";
import { Food } from "@prisma/client";


interface FoodItemProps {
  food: Food;
}

export const FoodItem = ({ food }: FoodItemProps) => {
  const animation = useAnimation();
  const { width } = useWindowSize();
  const targetRef = useRef(null);
  useOnClickOutside(targetRef, () => animation.start("initial"));

  const md = width >= 768;
  const lg = width >= 1024;

  const MotionLink = motion(Link);

  const type = foodTypes.find((type) => type.label === food.type)?.slug;

  return (
    <WhileInView
      y={md ? 0 : 100}
      x={md ? -150 : lg ? 400 : 0}
      duration={0.6}
      amount={0.2}
    >
      <MotionLink
        href={`/${type}/${food.slug}`}
        initial="initial"
        onMouseEnter={() => animation.start("animate")}
        onMouseLeave={() => animation.start("initial")}
        animate={animation}
        onClick={() => animation.start("animate")}
        className="flex text-white relative overflow-hidden flex-col items-center w-full max-w-[350px] mx-auto"
      >
        <Image src={food.image} alt={food.name} />
        <h3
          className={cn(
            "font-extrabold text-center uppercase text-lg sm:text-xl md:text-2xl mt-8 font-bungee_spice"
          )}
        >
          {food.name}
        </h3>
        <p
          className={cn(
            "font-bold md:text-lg mt-3 font-abril_fatface"
          )}
        >
          {food.price} BDT
        </p>
      </MotionLink>
    </WhileInView>
  );
};
