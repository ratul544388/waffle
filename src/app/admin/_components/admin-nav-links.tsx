"use client";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ChefHat, LayoutDashboard, ListOrdered, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "./user-button";

interface AdminNavLinksProps {
  onCloseSidebar?: () => void;
}

export const AdminNavLinks = ({ onCloseSidebar }: AdminNavLinksProps) => {
  const pathname = usePathname();

  const adminNavLinks = [
    {
      label: "Dashbaord",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      disabled: true,
    },
    {
      label: "Foods",
      href: "/admin/foods",
      icon: ChefHat,
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: ListOrdered,
      disabled: true,
    },
    {
      label: "Settings",
      href: "/admin/settings",
      icon: Settings,
      disabled: true,
    },
  ]

  return (
    <nav className="pt-2.5 flex flex-col h-full min-w-[210px]">
      <Logo className="text-blue-800 px-4" />
      <ul className="mt-5">
        {adminNavLinks.map(({ label, href, icon: Icon, disabled }) => {
          const active = pathname === href;
          return (
            <li key={label}>
              <Link
                onClick={() => onCloseSidebar?.()}
                href={href}
                className={cn(
                  "px-4 py-2.5 flex items-center gap-3.5 font-medium text-muted-foreground rounded-md hover:bg-accent transition-colors",
                  active &&
                    "bg-primary hover:bg-primary/90 shadow-sm shadow-primary text-white",
                  disabled && "pointer-events-none opacity-50"
                )}
              >
                <Icon className="size-4" />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <UserButton className="mt-auto" align="start" />
    </nav>
  );
};
