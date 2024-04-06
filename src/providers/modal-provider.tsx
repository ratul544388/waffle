"use client";
import { CreateFoodModal } from "@/components/modals/create-food-modal";
import { UpdateFoodModal } from "@/components/modals/update-food-modal";
import { useEffect, useState } from "react";
import { OrderModal } from "../components/modals/order-modal";
import { DeleteFoodModal } from "@/components/modals/delete-food-modal";
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
      <CreateFoodModal />
      <UpdateFoodModal />
      <DeleteFoodModal />
    </>
  );
};
