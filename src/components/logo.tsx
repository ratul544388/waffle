import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  className?: string;
  isAdmin?: boolean;
}

export const Logo = ({ className, isAdmin }: LogoProps) => {
  return (
    <Link
      href={isAdmin ? "/admin/foods" : "/"}
      className={cn("font-bungee_spice text-2xl", className)}
    >
      WAFFLE
    </Link>
  );
};
