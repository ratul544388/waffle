"use client";

import { calculateTotal, formatPhone, formatPrice } from "@/lib/utils";
import { OrderItem, User } from "@/types";
import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
import { useWindowSize } from "usehooks-ts";

export const useCrisp = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 640;
  useEffect(() => {
    Crisp.configure("9ed0fbbc-ff1f-434b-b619-053d6534da47", {
      autoload: false,
    });
    //@ts-ignore
    Crisp.setColorTheme("orange");
    Crisp.chat.onChatClosed(() => {
      if (isMobile) {
        hideChat();
      }
    });
    if (isMobile) {
      hideChat();
    }
  }, [isMobile]);

  const closeChat = () => {
    Crisp.chat.close();
  };

  const showChat = () => {
    if (isMobile) return;
    Crisp.chat.show();
  };

  const hideChat = () => {
    Crisp.chat.hide();
  };

  const openChat = () => {
    Crisp.chat.show();
    Crisp.chat.open();
  };

  const createOrder = ({
    user: { name, address, phone },
    orderItems,
  }: {
    user: User;
    orderItems: OrderItem[];
  }) => {
    const separator = `----------------`;

    const userInfo = `Name: ${name}\nPhone: ${formatPhone(
      phone
    )}\nAddress: ${address}`;
    const orderDetails = `${orderItems
      .map(
        ({ food: { name }, quantity, extras }, index) =>
          `${index + 1}: ${name} - Qty: ${quantity}${
            !!extras.length
              ? ` - (${extras
                  .map((item) => item.label)
                  .join(" + ")
                  .toString()})`
              : ""
          }\n`
      )
      .join(" ")
      .toString()}`;
    const total = calculateTotal(orderItems);
    const message = `Order Info:\n${separator}\n${userInfo}\n${separator}\nOrders (${
      orderItems.length
    } items):\n${orderDetails}\n${separator}\nTotal: ${formatPrice(total)}`;

    Crisp.message.send("text", message);
  };

  return { closeChat, createOrder, showChat, openChat };
};
