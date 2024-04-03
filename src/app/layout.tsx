import { ChatPlugin } from "@/components/chat-pluggin";
import { Header } from "@/components/header";
import { fontsClass } from "@/fonts";
import { cn } from "@/lib/utils";
import { ModalProvider } from "@/providers/modal-provider";
import type { Metadata } from "next";
import "./globals.css";
import { ToastProvider } from "@/providers/toast-provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(fontsClass, "bg-color_background font-inter")}>
        <Header />
        {children}
        <ChatPlugin />
        <ModalProvider />
        <ToastProvider />
      </body>
    </html>
  );
}
