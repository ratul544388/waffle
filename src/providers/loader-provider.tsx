"use client";

import { Loader } from "@/components/loader";
import { useMount } from "@/hooks/use-mount";

export const LoaderProvider = () => {
  const { isMounted } = useMount();
  if (isMounted) return;
  return (
    <Loader/>
  );
};
