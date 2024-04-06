"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { User } from "@prisma/client";
import { Menu } from "lucide-react";
import { AdminNavLinks } from "./admin-nav-links";

export const AdminMobileSidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="-translate-x-2">
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="py-2.5">
          <AdminNavLinks onCloseSidebar={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
};
