"use client";

import { UserButton } from "@/app/admin/_components/user-button";
import { Container } from "@/components/container";
import { User } from "@prisma/client";
import { motion } from "framer-motion";
import { CartSheet } from "./cart-sheet";
import { Logo } from "./logo";
import { SearchInput } from "./search-input";
import { WhileInView } from "./while-in-view";
import { MobileSearchBar } from "./mobile-search-bar";

export const Header = ({ user }: { user: User | null }) => {
  return (
    <motion.header
      animate={{ opacity: [0, 1], y: [-40, 0], transition: { duration: 0.4 } }}
      className="flex sticky top-0 z-50 opacity-0 w-full bg-background/40 backdrop-blur-md py-3"
    >
      <Container className="flex items-center justify-between gap-10">
        <Logo />
        <SearchInput className="hidden sm:block"/>
        <div className="flex items-center gap-4">
          <MobileSearchBar/>
          <CartSheet />
          {user?.role === "ADMIN" && <UserButton />}
        </div>
      </Container>
    </motion.header>
  );
};
