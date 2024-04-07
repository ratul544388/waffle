"use client";

import { useCrisp } from "@/hooks/use-crips";
import { useEffect } from "react";

export const ChatPlugin = () => {
  const { showChat } = useCrisp();

  useEffect(() => {
    showChat();
  }, [showChat]);

  return <div className="hidden"></div>;
};
