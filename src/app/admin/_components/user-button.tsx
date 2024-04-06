"use client";

import { changeMode } from "@/actions/change-mode";
import { Avatar } from "@/components/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useClerk, useUser } from "@clerk/nextjs";
import { LogOut, ShieldAlert, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

interface UserButtonProps {
  className?: string;
  align?: "start" | "end";
}

export const UserButton = ({ className, align = "end" }: UserButtonProps) => {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const { signOut } = useClerk();

  const router = useRouter();
  const isAdmin = pathname.includes("admin");

  const handleModeChange = () => {
    startTransition(() => {
      changeMode().then(({ success, error }) => {
        if (success) {
          const url = isAdmin ? "/" : "/admin/foods";
          router.push(url);
        } else {
          toast.error(error);
        }
      });
    });
  };

  const dropdownMenuItems = [
    {
      label: isAdmin ? "Switch to User" : "Switch to Admin",
      icon: isAdmin ? User2 : ShieldAlert,
      onClick: () => handleModeChange(),
      disabled: isPending,
    },
    {
      label: "Logout",
      icon: LogOut,
      onClick: () => signOut(() => router.push("/")),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={cn("rounded-full bg-accent size-8 focus:ring-2 focus:ring-primary", className)}
        >
          {user?.imageUrl && <Avatar image={user?.imageUrl as string} className="size-8"/>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        className="flex flex-col w-[300px] py-3 px-0"
      >
        <div className="flex items-center gap-3 text-sm mb-5 px-3">
          <Avatar
            image={user?.imageUrl as string}
            className="size-12 min-w-12"
          />
          <div>
            <h3 className="font-medium leading-4">
              {`${user?.firstName} ${user?.lastName}`}
            </h3>
            <p className="leading-4 line-clamp-1">
              {user?.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        {dropdownMenuItems.map(({ label, icon: Icon, onClick, disabled }) => (
          <DropdownMenuItem
            onClick={onClick}
            key={label}
            disabled={disabled}
            className="gap-3 py-2.5 px-5 rounded-none"
          >
            <Icon className="size-4 text-muted-foreground" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
