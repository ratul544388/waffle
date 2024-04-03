"use client";
import * as z from "zod";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
import { OrderSchema } from "@/validations";
import { OrderItem, User } from "@/types";
import { calculateTotal, formatPrice } from "@/lib/utils";

export const useCrisp = () => {
  useEffect(() => {
    Crisp.configure("9ed0fbbc-ff1f-434b-b619-053d6534da47", {
      autoload: false,
    });
  }, []);

  const hideChat = () => {
    Crisp.chat.close();
  };

  const show = () => {
    Crisp.chat.show();
  };

  const createOrder = ({
    user: { name, address, phone },
    orderItems,
  }: {
    user: User;
    orderItems: OrderItem[];
  }) => {
    const separator = `----------------`;
    const userInfo = `Name: ${name}\nPhone: ${phone}\nAddress: ${address}`;
    const orderDetails = `${orderItems
      .map(
        ({ food: { name }, quantity }, index) =>
          `${index + 1}: ${name} - Qty: ${quantity}\n`
      )
      .join(" ")
      .toString()}`;
    const total = calculateTotal(orderItems);
    const message = `Order Info:\n${separator}\n${userInfo}\n${separator}\nOrders (${
      orderItems.length
    } items):\n${orderDetails}\n${separator}\nTotal: ${formatPrice(total)}`;

    Crisp.message.send("text", message);
  };

  return { hideChat, createOrder, show };
};
