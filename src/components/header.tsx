"use client";

import { Container } from "@/container";
import { motion } from "framer-motion";
import Link from "next/link";
import { CartSheet } from "./cart-sheet";
import { Image } from "./image";
import { WhileInView } from "./while-in-view";
import { SearchInput } from "./search-input";

export const Header = () => {
  return (
    <motion.header
      animate={{ opacity: [0, 1], y: [-40, 0], transition: { duration: 0.4 } }}
      className="flex sticky top-0 z-50 opacity-0 overflow-hidden w-full bg-color_pink"
    >
      <Container className="flex items-center justify-between gap-10">
        <WhileInView x={-30} delay={0.6}>
          <Link href="/">
            <Image src="/logos/logo.png" alt="logo" className="size-16" />
          </Link>
        </WhileInView>
        <WhileInView y={-30} delay={0.6} className="w-full hidden sm:block">
          <SearchInput />
        </WhileInView>
        <WhileInView x={30} delay={0.6} className="flex items-center">
          <CartSheet />
        </WhileInView>
      </Container>
    </motion.header>
  );
};
