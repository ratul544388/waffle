import { OrderItem } from "@/types";
import { auth } from "@clerk/nextjs";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "./db";
import { foodTypes } from "@/constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateTotal(orderItems: OrderItem[] = []) {
  return orderItems.reduce((total, item) => {
    return (total +=
      (item.food.price +
        item.extras.reduce((total, extra) => {
          return (total += extra.price);
        }, 0)) *
      item.quantity);
  }, 0);
}

export const formatPrice = (price: number, type: "icon" | "text" = "text") => {
  const symbol = type === "icon" ? "৳" : " BDT";
  return `${price.toLocaleString()}${symbol}`;
};

export const isAdmin = async () => {
  const { userId } = auth();
  if (!userId) return false;

  const user = await db.user.findUnique({
    where: {
      userId,
      role: "ADMIN",
    },
  });

  return !!user;
};

export const formatString = (
  str: string,
  format: "capitlize" | "slug" = "capitlize"
) => {
  if (format === "capitlize") {
    return str
      .replace(/-|_/g, (match) => {
        return match === "and" ? "&" : " ";
      })
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ")
      .toString();
  } else {
    return str
      .replace(/ |&/g, (match) => {
        return match === "&" ? "and" : "-";
      })
      .toLowerCase();
  }
};

export const formatPhone = (phone: string) => {
  return phone.startsWith("0") ? phone : `0${phone}`;
};

export const getSlugFromType = (value: string) => {
  return foodTypes.find((type) => type.label === value)?.slug as string;
};
