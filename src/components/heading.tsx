import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { WhileInView } from "./while-in-view";
interface HeadingProps {
  className?: string;
  children: ReactNode;
}

export const Heading = ({ className, children }: HeadingProps) => {
  return (
    <WhileInView y={200} duration={0.8}>
      <h1 className={cn("font-bold text-center text-6xl sm:text-7xl md:text-8xl text-orange-500 font-lemon")}>{children}</h1>
    </WhileInView>
  );
};
