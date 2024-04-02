"use client";

import { Container } from "@/container";
import { lemon, potta_one } from "@/fonts";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const staggerVariants = {
  initial: {
    y: -30,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const AddOns = () => {
  const addOnItems = [
    {
      label: "ice-cream",
      price: 80,
    },
    {
      label: "whipped cream",
      price: 60,
    },
    {
      label: "extra nuts",
      price: 40,
    },
    {
      label: "extra nutella",
      price: 60,
    },
  ];
  return (
    <Container
      element="section"
      className="flex flex-col mt-10 w-fit items-center border-[5px] border-orange-950 rounded-br-2xl rounded-tl-2xl py-3 px-5"
    >
      <h2 className={cn(lemon.className, "text-white text-2xl")}>ADD-ONS</h2>
      <motion.ul
        variants={staggerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-3 flex flex-col items-center"
      >
        {addOnItems.map(({ label, price }) => (
          <motion.li
            variants={staggerVariants}
            key={label}
            className="flex gap-2"
          >
            <h4 className={cn(potta_one.className, "text-lg capitalize")}>
              {label}
            </h4>
            <p className="font-bold text-lg text-white">BDT {price}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  );
};
