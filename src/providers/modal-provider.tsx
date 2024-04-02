"use client";
import { useEffect, useState } from "react";
import { OrderModal } from "../components/modals/order-modal";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <OrderModal />
    </>
  );
};
