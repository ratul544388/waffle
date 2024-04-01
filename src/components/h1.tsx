import { cn } from "@/lib/utils";
import { Lemon } from "next/font/google";
import { ReactNode } from "react";
import { WhileInView } from "./while-in-view";
const font = Lemon({ subsets: ["latin"], weight: ["400"] });
interface HeadingProps {
  className?: string;
  children: ReactNode;
}

export const Heading = ({ className, children }: HeadingProps) => {
  return (
    <WhileInView y={200} duration={0.8}>
      <h1 className={cn(font.className, "font-bold text-7xl")}>{children}</h1>
    </WhileInView>
  );
};
