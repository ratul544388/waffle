"use client";

import { Image } from "@/components/image";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Food } from "@prisma/client";

interface AdminFoodItemProps {
  food: Food;
}

export const AdminFoodItem = ({ food }: AdminFoodItemProps) => {
  const { onOpen } = useModalStore();
  return (
    <div
      onClick={() => onOpen("updateFoodModal", { food })}
      role="button"
      className="flex text-white relative overflow-hidden flex-col items-center w-full max-w-[350px] mx-auto"
    >
      <Image src={food.image} alt={food.name} />
      <h3 className={cn("font-extrabold uppercase mt-8 text-center")}>{food.name}</h3>
      <p className={cn("font-semibold md:text-lg mt-3")}>{food.price} BDT</p>
    </div>
  );
};
