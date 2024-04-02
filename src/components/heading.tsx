import { lemon } from "@/fonts";
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
      <h1 className={cn(lemon.className, "font-bold text-center text-8xl text-orange-950")}>{children}</h1>
    </WhileInView>
  );
};
