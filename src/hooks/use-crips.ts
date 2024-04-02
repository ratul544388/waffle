"use client";
import * as z from "zod";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";
import { OrderSchema } from "@/validations";

export const useCrisp = () => {
  useEffect(() => {
    Crisp.configure("9ed0fbbc-ff1f-434b-b619-053d6534da47", {
      autoload: false,
    });
  }, []);

  const hideChat = () => {
    Crisp.chat.close();
  };

  const createOrder = ({
    name,
    phone,
    address,
  }: z.infer<typeof OrderSchema>) => {
    Crisp.message.send("text", `Order Info\n${name}\n${phone}\n${address}`);
  };

  return { hideChat, createOrder };
};
