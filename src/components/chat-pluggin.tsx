"use client";

import { useCrisp } from "@/hooks/use-crips";
import { useEffect } from "react";

export const ChatPlugin = () => {
  const { show } = useCrisp();

  useEffect(() => {
    show();
  }, [show]);

  return <div></div>;
};
