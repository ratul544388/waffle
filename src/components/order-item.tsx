"use client";

import { OrderItem as OrderItemType } from "@/types";
import { useState } from "react";
import { Image } from "./image";
import { QuantitySelect } from "./quantity-select";
import { useOrderStore } from "@/hooks/use-order-store";
import { ExtraDropdownMenu } from "./extra-dropdown-menu";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface OrderItemProps {
  orderItem: OrderItemType;
}

export const OrderItem = ({
  orderItem: {
    id,
    food: { name, image, price },
    quantity: orderQuantity,
    extras,
  },
}: OrderItemProps) => {
  const [quantity, setQuantity] = useState(orderQuantity);
  const { orders, updateOrders, addExtra, deleteOrder } = useOrderStore();

  return (
    <li className="space-y-3">
      <div className="flex items-center gap-3">
        <Image src={image} alt={name} className="size-20" />
        <div className="text-sm font-medium font-inter">
          <h3 className="font-semibold">{name}</h3>
          <p className="text-muted-foreground">
            Qty: <span className="font-bold">{quantity}</span>
          </p>
          <p className="text-muted-foreground">
            Price:{" "}
            <span className="font-semibold">{formatPrice(price, "icon")}</span>
          </p>
          <p className="text-muted-foreground">
            Total:{" "}
            <span className="font-semibold">
              {formatPrice(price * quantity, "icon")}
            </span>
          </p>
        </div>
      </div>
      <div className="flex gap-3 flex-wrap">
        <ExtraDropdownMenu
          value={extras}
          onChange={(value) => addExtra({ orderItemId: id, extras: value })}
        />
        <QuantitySelect
          quantity={quantity}
          onChange={(value) => {
            setQuantity(value);
            updateOrders({ orderItemId: id, quantity: value });
          }}
        />
        {orders.length > 1 && (
          <Button
            onClick={() => deleteOrder(id)}
            size="xs"
            className="text-muted-foreground"
            variant="outline"
          >
            Remove
            <X className="size-4" />
          </Button>
        )}
      </div>
    </li>
  );
};
