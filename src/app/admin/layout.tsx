import { isAdmin } from "@/lib/utils";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { AdminNavbar } from "./_components/admin-navbar";
import { Container } from "@/components/container";
import { AdminNavLinks } from "./_components/admin-nav-links";
import { currentUser } from "@/lib/user";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();


  if (user?.role !== "ADMIN" || user?.mode !== "ADMIN") {
    redirect("/");
  }

  return (
    <>
      <AdminNavbar />
      <main className="min-h-screen">
        <Container className="flex w-full">
          <aside className="sticky h-screen top-0 bg-background border-r pr-8 py-3 hidden md:block max-w-[230px]">
            <AdminNavLinks />
          </aside>
          <div className="pb-14 w-full md:pt-5 md:pl-8">{children}</div>
        </Container>
      </main>
    </>
  );
}
