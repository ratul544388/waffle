"use client";

import { OrderItem as OrderItemType } from "@/types";
import { useState } from "react";
import { Image } from "./image";
import { QuantitySelect } from "./quantity-select";
import { useOrderStore } from "@/hooks/use-order-store";

interface OrderItemProps {
  orderItem: OrderItemType;
}

export const OrderItem = ({
  orderItem: {
    id,
    food: { name, image, price },
    quantity: orderQuantity,
  },
}: OrderItemProps) => {
  const [quantity, setQuantity] = useState(orderQuantity);
  const { updateOrders } = useOrderStore();

  return (
    <li className="flex gap-3">
      <Image src={image} alt={name} className="size-20" />
      <div className="text-sm font-medium font-inter">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-muted-foreground">
          Qty: <span className="font-bold">{quantity}</span>
        </p>
        <p className="text-muted-foreground">
          Price: <span className="font-semibold">{price}৳</span>
        </p>
        <p className="text-muted-foreground">
          Total: <span className="font-semibold">{price * quantity}৳</span>
        </p>
      </div>
      <QuantitySelect
        quantity={quantity}
        onChange={(value) => {
          setQuantity(value);
          updateOrders({ orderItemId: id, quantity: value });
        }}
      />
    </li>
  );
};
