"use client";

import { useCartStore } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { CartItem as CartItemType } from "@/types";
import { X } from "lucide-react";
import { ExtraDropdownMenu } from "./extra-dropdown-menu";
import { Image } from "./image";
import { QuantitySelect } from "./quantity-select";
import { Button } from "./ui/button";

interface OrderItemProps {
  cartItem: CartItemType;
}

export const CartItem = ({
  cartItem: {
    id,
    food: { name, image, price },
    quantity,
    extras,
  },
}: OrderItemProps) => {
  const { updateCart, deleteCart, addExtra } = useCartStore();

  return (
    <div className="space-y-3">
      <div className="flex gap-3">
        <Image src={image} alt={name} className="size-20" />
        <div className="text-sm font-medium font-inter">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-muted-foreground">
            Qty: <span className="font-bold">{quantity}</span>
          </p>
          <p className="text-muted-foreground">
            Each: <span className="font-semibold">{formatPrice(price, "icon")}</span>
          </p>
          <p className="text-muted-foreground">
            Total:{" "}
            <span className="font-semibold">
              {formatPrice(price * quantity)}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <ExtraDropdownMenu
          value={extras}
          onChange={(value) => addExtra({ cartItemId: id, extras: value })}
        />
        <QuantitySelect
          quantity={quantity}
          onChange={(value) => updateCart({ cartItemId: id, quantity: value })}
        />
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
    </div>
  );
};
