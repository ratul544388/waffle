"use client";

import { useCartStore } from "@/hooks/use-cart";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Food } from "@/types";
import { motion, useAnimation } from "framer-motion";
import { useRef } from "react";
import { useOnClickOutside, useWindowSize } from "usehooks-ts";
import { Image } from "./image";
import { MotionButton } from "./motion-button";
import { WhileInView } from "./while-in-view";
import { useOrderStore } from "@/hooks/use-order-store";

const variants = {
  initial: {
    height: 0,
  },
  animate: {
    height: "auto",
  },
};

interface FoodItemProps {
  food: Food;
}

export const FoodItem = ({ food }: FoodItemProps) => {
  const { addToCart } = useCartStore();
  const { setOrders } = useOrderStore();
  const { onOpen } = useModalStore();
  const animation = useAnimation();
  const { width } = useWindowSize();
  const targetRef = useRef(null);
  useOnClickOutside(targetRef, () => animation.start("initial"));

  const md = width >= 768;
  const lg = width >= 1024;

  const handleOrder = () => {
    setOrders([{ id: food.id, food, quantity: 1 }]);
    onOpen("orderModal");
  };

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
        <Image src={food.image} alt={food.name} />
        <h3
          className={cn(
            "font-extrabold uppercase sm:text-lg md:text-xl mt-8 font-lemon"
          )}
        >
          {food.name}
        </h3>
        <p
          className={cn("font-bold sm:text-lg md:text-xl mt-3 font-caprasimo")}
        >
          {food.price} BDT
        </p>
        <motion.div
          variants={variants}
          className="absolute inset-x-0 flex items-center flex-col gap-3 bg-orange-500 px-5 rounded-xl bottom-0"
        >
          <h3 className="text-lg font-bold mt-5">{food.name}</h3>
          <p className="text-lg font-bold">{food.price} BDT</p>
          <div className="flex md:flex-col lg:flex-row gap-3.5 mb-5">
            <MotionButton variant="green" onClick={handleOrder}>
              Order now
            </MotionButton>
            <MotionButton onClick={() => addToCart(food)} variant="white">
              Add to cart
            </MotionButton>
          </div>
        </motion.div>
      </motion.div>
    </WhileInView>
  );
};
