"use client";

import { useCartStore } from "@/hooks/use-cart";
import { CartItem as CartItemType } from "@/types";
import { Image } from "./image";
import { QuantitySelect } from "./quantity-select";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface OrderItemProps {
  cartItem: CartItemType;
}

export const CartItem = ({
  cartItem: {
    id,
    food: { name, image, price },
    quantity,
  },
}: OrderItemProps) => {
  const { updateCart, deleteCart } = useCartStore();

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <Image src={image} alt={name} className="size-20" />
        <div className="text-sm font-medium font-inter">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-muted-foreground">
            Qty: <span className="font-bold">{quantity}</span>
          </p>
          <p className="text-muted-foreground">
            Each: <span className="font-semibold">{formatPrice(price)}</span>
          </p>
          <p className="text-muted-foreground">
            Total:{" "}
            <span className="font-semibold">
              {formatPrice(price * quantity)}
            </span>
          </p>
        </div>
        <QuantitySelect
          quantity={quantity}
          onChange={(value) => updateCart({ cartItemId: id, quantity: value })}
        />
      </div>
      <Button
        onClick={() => deleteCart(id)}
        size="xs"
        className="text-muted-foreground"
        variant="outline"
      >
        Remove
        <X className="size-4" />
      </Button>
    </div>
  );
};
