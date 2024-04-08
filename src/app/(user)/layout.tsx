import { ChatPlugin } from "@/components/chat-pluggin";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MobileBottomNavbar } from "@/components/mobile-bottom-navbar";
import { currentUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (user?.role === "ADMIN" && user.mode === "ADMIN") {
    redirect("/admin/foods");
  }

  return (
    <>
      <Header user={user} />
      <main className="min-h-screen pt-3">{children}</main>
      <Footer />
      <MobileBottomNavbar />
      <ChatPlugin />
    </>
  );
}
