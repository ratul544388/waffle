import { Food, OrderItem } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateTotal(orderItems: OrderItem[] = []) {
  return orderItems.reduce((total, item) => {
    return total += item.quantity * item.food.price;
  }, 0)
}

export const formatPrice = (price: number) => {
  return `${price.toLocaleString()}৳`;
}