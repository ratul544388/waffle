"use client";

import { useCrisp } from "@/hooks/use-crips";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillMessage } from "react-icons/ai";
import { BiSolidDrink } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { GiChocolateBar } from "react-icons/gi";
import { WhileInView } from "./while-in-view";
import { motion } from "framer-motion";

export const MobileBottomNavbar = () => {
  const { openChat } = useCrisp();
  const pathname = usePathname();

  const links = [
    {
      icon: FaHome,
      href: "/",
    },
    {
      icon: GiChocolateBar,
      href: "/waffles",
    },
    {
      icon: BiSolidDrink,
      href: "/drinks",
    },
  ];
  return (
    <motion.nav
      animate={{ opacity: [0, 1], y: [30, 0], transition: { duration: 0.5 } }}
      className="fixed opacity-0 flex items-center justify-between bg-neutral-900 bottom-0 inset-x-0 h-[60px] px-3 sm:hidden"
    >
      {links.map(({ icon: Icon, href }, index) => (
        <Link
          href={href}
          key={index}
          className={cn(
            "py-2 px-4 hover:bg-white/10 rounded-full flex transition-colors",
            pathname === href && "bg-primary hover:bg-primary/90"
          )}
        >
          <Icon className="size-8" />
        </Link>
      ))}
      <button
        onClick={openChat}
        className="rounded-full py-2 px-4 hover:bg-white/10"
      >
        <AiFillMessage className="size-8" />
      </button>
    </motion.nav>
  );
};
