"use client";

import { Container } from "@/container";
import { motion } from "framer-motion";
import Link from "next/link";
import { CartSheet } from "./cart-sheet";
import { Image } from "./image";
import { WhileInView } from "./while-in-view";

export const Header = () => {
  return (
    <motion.header
      animate={{ opacity: [0, 1], y: [-40, 0], transition: { duration: 0.4 } }}
      className="flex sticky top-0 z-50 opacity-0 overflow-hidden w-full h-20"
    >
      <span className="absolute inset-x-0 h-[65px] bg-color_pink -translate-y-3" />
      <Container className="flex justify-between">
        <span />
        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 top-0 rounded-full"
        >
          <WhileInView
            scale={0}
            delay={0.6}
            className="bg-color_blue rounded-full"
          >
            <Image src="/logos/logo.png" alt="logo" className="size-20" />
          </WhileInView>
        </Link>
        <WhileInView x={30} delay={0.6} className="mt-1.5">
          <CartSheet />
        </WhileInView>
      </Container>
    </motion.header>
  );
};
