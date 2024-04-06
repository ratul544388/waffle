"use client";

import { MotionButton } from "@/components/motion-button";
import { useCartStore } from "@/hooks/use-cart";
import { useModalStore } from "@/hooks/use-modal-store";
import { useOrderStore } from "@/hooks/use-order-store";
import { Food } from "@prisma/client";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

interface ActionButtonsProps {
  food: Food;
}

export const ActionButtons = ({ food }: ActionButtonsProps) => {
  const { cart, addToCart } = useCartStore();
  const { setOrders } = useOrderStore();

  const cartQuantity = cart.find((item) => item.food.id === food.id)?.quantity;

  const handleAddToCart = () => {
    toast.success("Added to cart");
    addToCart(food);
  };

  const handleOrder = () => {
    setOrders([{ id: uuid(), food, quantity: 1, extras: [] }]);
    onOpen("orderModal");
  };

  const { onOpen } = useModalStore();
  return (
    <div className="flex gap-4 mt-5 w-full">
      <MotionButton onClick={handleOrder} className="w-full">
        Order now
      </MotionButton>
      <MotionButton
        onClick={handleAddToCart}
        className="w-full relative"
        variant="green"
      >
        Add to cart
        {cartQuantity && (
          <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-primary size-7 rounded-full flex items-center justify-center text-xs font-bold text-white">
            +{cartQuantity}
          </span>
        )}
      </MotionButton>
    </div>
  );
};
