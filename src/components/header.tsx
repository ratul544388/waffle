"use client";

import { UserButton } from "@/app/admin/_components/user-button";
import { Container } from "@/components/container";
import { User } from "@prisma/client";
import { CartSheet } from "./cart-sheet";
import { Logo } from "./logo";
import { MobileSearchBar } from "./mobile-search-bar";
import { SearchInput } from "./search-input";
import { FaHome } from "react-icons/fa";
import { GiChocolateBar } from "react-icons/gi";
import { motion } from "framer-motion";
import { BiSolidDrink } from "react-icons/bi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const userNavLinks = [
  {
    label: "Home",
    icon: FaHome,
    href: "/",
  },
  {
    label: "Waffles",
    icon: GiChocolateBar,
    href: "/waffles",
  },
  {
    label: "Drinks",
    icon: BiSolidDrink,
    href: "/drinks",
  },
];

export const Header = ({ user }: { user: User | null }) => {
  const pathname = usePathname();
  return (
    <motion.header
      animate={{ opacity: [0, 1], y: [-40, 0], transition: { duration: 0.4 } }}
      className="flex items-center sticky top-0 z-50 opacity-0 w-full bg-background/40 backdrop-blur-md h-[65px]"
    >
      <Container className="flex items-center justify-between gap-10">
        <nav className="flex items-center gap-10">
          <Logo />
          <ul className="sm:flex items-center gap-5 hidden">
            {userNavLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  className={cn(
                    "relative font-medium text-sm text-muted-foreground",
                    isActive && "text-foreground"
                  )}
                  href={href}
                  key={label}
                >
                  {label}
                  <motion.span
                    variants={{
                      visible: { width: "100%" },
                      hidden: { width: 0 },
                    }}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    className="absolute left-0 top-full bg-primary h-1 rounded-full"
                  />
                </Link>
              );
            })}
          </ul>
        </nav>
        <SearchInput className="hidden md:block" />
        <div className="flex items-center gap-4">
          <MobileSearchBar />
          <CartSheet />
          {user?.role === "ADMIN" && <UserButton />}
        </div>
      </Container>
    </motion.header>
  );
};
